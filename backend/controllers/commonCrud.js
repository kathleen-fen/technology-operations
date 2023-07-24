import { Equipment } from "../models/Equipment.js";
import { Fabrics } from "../models/Fabrics.js";
import { Specialties } from "../models/Specialties.js";
import { Categories } from "../models/Categories.js";
import { SettingsInt } from "../models/SettingsInt.js";
import { HTTP404Error } from "../utilities/errors/Http404Error.js";

const routeMap = new Map([
  ["/fabrics", Fabrics],
  ["/equipment", Equipment],
  ["/specialties", Specialties],
  ["/categories", Categories],
  ["/settings_int", SettingsInt],
]);
export const commonRouteFilters = routeMap.keys();

export const getAll = async (req, res, _next) => {
  try {
    const result = await routeMap.get(req.baseUrl).findAll();
    res.send(result);
  } catch (err) {
    console.log(err);
  }
};
export const createItem = async (req, res, _next) => {
  try {
    const newItem = await routeMap.get(req.baseUrl).create({ ...req.body });
    res.send(newItem);
  } catch (err) {
    console.log(err);
  }
};

export const updateItem = async (req, res, next) => {
  try {
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
