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
    res.send(newFabric);
  } catch (err) {
    console.log(err);
  }
};

export const updateFabric = async (req, res, next) => {
  try {
    const { id } = req.params;
    let fabric = await Fabrics.findByPk(id);
    fabric.name = req.body.name ?? fabric.name;
    fabric.ratio = req.body.ratio ?? fabric.ratio;
    const updatedFabric = await fabric.save();
    res.send(updatedFabric);
  } catch (err) {
    console.log(err);
  }
};
export const deleteFabric = async (req, res, next) => {
  try {
    const { id } = req.params;
    let fabric = await Fabrics.findByPk(id);
    if (!fabric) {
      return res.status(400).send(`Fabric does not exists`);
    }
    const result = await Fabrics.destroy({
      where: {
        id: id,
      },
    });
    return res.status(200).send(`Fabric deleted ${result}`);
  } catch (err) {
    console.log(err);
  }
};
