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

// find all the children recursively and add ids to arrayOfIdToDelete
const checkChildren = async (arrayOfIdToDelete, item, dictionary) => {
  if (item.isFolder) {
    const children = await dictionary.findAll({
      attributes: ["id", "isFolder"],
      where: {
        parent: item.id,
      },
    });
    console.log("nested folder: ", children);
    for (let i = 0; i < children.length; i++) {
      console.log("child: ", children[i].dataValues);
      const child = children[i].dataValues;
      arrayOfIdToDelete.push(child.id);

      if (child.isFolder) {
        await checkChildren(arrayOfIdToDelete, child, dictionary);
      }
    }
  }
};

// mark as deleted without transaction
export const markItemsAsDeleted = async (req, res, next) => {
  const { id } = req.params;
  const dictionary = routeMap.get(req.baseUrl);
  const arrayOfIdToDelete = [];
  try {
    const item = await dictionary.findByPk(id);
    console.log("item: ", item);
    arrayOfIdToDelete.push(+id);
    await checkChildren(arrayOfIdToDelete, item, dictionary);
    console.log("arrayOfIdToDelete; ", arrayOfIdToDelete);
    console.log("new deleted: ", !item.dataValues.delete);
    const deletedItems = await dictionary.update(
      { deleted: !item.dataValues.deleted },
      {
        where: {
          id: arrayOfIdToDelete,
        },
      }
    );
    res.send(deletedItems);
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
