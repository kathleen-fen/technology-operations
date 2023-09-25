import { HTTP404Error } from "../utilities/errors/Http404Error.js";

import { Equipment } from "../models/Equipment.js";
import { Fabrics } from "../models/Fabrics.js";
import { Specialties } from "../models/Specialties.js";
import { Categories } from "../models/Categories.js";
import { SettingsInt } from "../models/SettingsInt.js";

import { HTTP400Error } from "../utilities/errors/Http400Error.js";

const routeMap = new Map([
  ["/fabrics", Fabrics],
  ["/equipment", Equipment],
  ["/specialties", Specialties],
  ["/categories", Categories],
  ["/settings_int", SettingsInt],
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
  const result = await routeMap
    .get(dictionary)
    .findAll({ where: { parent: parentId } });
  return result;
};

export const getAll = async (req, res, _next) => {
  try {
    const result = await routeMap.get(req.baseUrl).findAll();
    res.send(result);
  } catch (err) {
    console.log(err);
  }
};

//create new dictionary item
export const createItem = async (req, res, next) => {
  try {
    //if parent is defined check if it exists in the database
    await checkParent(req.body.parent, req.baseUrl);
    const newItem = await routeMap.get(req.baseUrl).create({ ...req.body });
    res.send(newItem);
  } catch (err) {
    console.log(err);
  }
};

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
  }
};

const markAsDeletedById = async (id, dictionary) => {
  const item = await routeMap.get(dictionary).findByPk(id);
  if (item.isFolder) {
    const children = await getItemsByParent(item.id, dictionary);
    for (let i = 0; i++; i < children.length) {
      await markAsDeleted(children[i], dictionary);
    }
  }
  // set deleted field to true here item.deleted = true
};

export const markAsDeleted = async (req, res, next) => {
  const { id } = req.params;
  try {
    await markAsDeletedById(id);
    res.status(200).send("Marked as deleted successfully");
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

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
  }
};

export const getByParent = async (req, res, next) => {
  const { parent } = req.params;
  if (!parent) parent = null;
  try {
    const result = await getItemsByParent(parent, req);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
};
