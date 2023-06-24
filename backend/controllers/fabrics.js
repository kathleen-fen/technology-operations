import { Fabrics } from "./../models/Fabrics.js";

export const getAllFabrics = async (_req, res, _next) => {
  try {
    const fabrics = await Fabrics.findAll();
    res.send(fabrics);
  } catch (err) {
    console.log(err);
  }
};

export const createFabric = async (req, res, _next) => {
  try {
    const newFabric = await Fabrics.create({ ...req.body });
    console.log("create fabric: ", newFabric);
    res.send(newFabric);
  } catch (err) {
    console.log(err);
  }
};
