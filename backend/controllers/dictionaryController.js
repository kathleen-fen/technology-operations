import { HTTP404Error } from "../utilities/errors/Http404Error.js";

import { Equipment } from "../models/Equipment.js";
import { Fabrics } from "../models/Fabrics.js";
import { Specialties } from "../models/Specialties.js";
import { Categories } from "../models/Categories.js";
import { SettingsInt } from "../models/SettingsInt.js";
import { Models } from "../models/Models.js";
import { sequelize } from "../connection.js";

import { HTTP400Error } from "../utilities/errors/Http400Error.js";

const routeMap = new Map([
  ["/models", Models],
  ["/fabrics", Fabrics],
  ["/equipment", Equipment],
  ["/specialties", Specialties],
  ["/categories", Categories],
  ["/settings_int", SettingsInt], // TODO: add deleted, isFolder, parent
]);
export const dictionaryRouteFilters = routeMap.keys();

const checkParent = async (parentId, dictionary) => {
  if (parentId) {
    const parent = await routeMap.get(dictionary).findByPk(parentId);
    if (!parent || !parent.isFolder) {
      const error = new HTTP400Error("Folder with such id is not found!");
      return next(error);
    }
  }
};

const getItemsByParent = async (parentId, dictionary) => {
  const result = await dictionary.findAll({ where: { parent: parentId } });
  return result;
};

const markChildrenAsDeleted = async (item, dictionary) => {
  if (item.isFolder) {
    const deletedItem = await dictionary.update(
      { deleted: true },
      {
        where: {
          parent: item.id,
        },
      }
    );
    console.log("nested folder: ", deletedItem);
    const children = await getItemsByParent(item.id, dictionary);
    console.log("children: ", children);
    throw new Error();
    for (let i = 0; i < children.length; i++) {
      console.log("child: ", children[i].dataValues);
      const child = children[i].dataValues;
      if (child.isFolder) {
        await markChildrenAsDeleted(child, dictionary);
      }
    }
  }
};

// get all elements
export const getAll = async (req, res, _next) => {
  try {
    const result = await routeMap.get(req.baseUrl).findAll();
    res.send(result);
  } catch (err) {
    console.log(err);
  }
};

// create new dictionary item
export const createItem = async (req, res, next) => {
  try {
    //if parent is defined check if it exists in the database
    await checkParent(req.body.parent, req.baseUrl);
    const newItem = await routeMap.get(req.baseUrl).create({ ...req.body });
    res.send(newItem);
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

// update element
export const updateItem = async (req, res, next) => {
  try {
    //if parent is defined check if it exists in the database
    await checkParent(req.body.parent, req.baseUrl);
    const { id } = req.params;
    let item = await routeMap.get(req.baseUrl).findByPk(id);
    if (!item) {
      return res.status(400).send(`This item does not exists`);
    }
    Object.keys(req.body).forEach((key) => {
      item[key] = req.body[key];
    });
    const updatedItem = await item.save();
    res.send(updatedItem);
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

// mark as deleted including children recursively
export const markAsDeleted = async (req, res, next) => {
  const { id } = req.params;
  const dictionary = routeMap.get(req.baseUrl);

  try {
    await sequelize.transaction(async (t) => {
      const item = await dictionary.findByPk(id);
      item.deleted = true;
      await item.save();
      console.log("first: ", item.id);
      await markChildrenAsDeleted(item, dictionary);

      res.status(200).send("Marked as deleted successfully");
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

// delete item from database
export const deleteItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    let item = await routeMap.get(req.baseUrl).findByPk(id);
    if (!item) {
      const error = new HTTP404Error("Item not found!");
      return next(error);
    }
    const result = await routeMap.get(req.baseUrl).destroy({
      where: {
        id: id,
      },
    });
    return res.status(200).send(`Item deleted ${result}`);
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

// get children
export const getByParent = async (req, res, next) => {
  const { parent } = req.params;
  if (!parent) parent = null;
  console.log("parent: ", parent);
  try {
    const result = await getItemsByParent(parent, routeMap.get(req.baseUrl));
    res.send(result);
  } catch (err) {
    console.log(err);
    return next(err);
  }
};
