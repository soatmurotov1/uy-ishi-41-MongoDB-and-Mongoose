import productsModel from "../models/water_products.model.js";

export const create = async (req, res, next) => {
  try {
    const createwater = await water_productsModel.create(req.validatedData);
    
    res.status(201).json({ message: `Created water_product`, data: createwater });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const getAllwater = await productsModel.find();
    res.status(200).json({
      message: `found all water`,
      count: getAllwater.length,
      data: getAllwater,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const getOnewater = await productsModel.findById(req.params.id);
    if (!getOnewater) {
      return res.status(404).json({ message: `not found ID ${req.params.id} from water`});
    }
    res.status(200).json({
      message: `found ID ${req.params.id} from water`, data: getOnewater,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const updatewater = await productsModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!updatewater) {
      return res
        .status(404)
        .json({ message: `not found ID ${req.params.id} from water` });
    }
    res.status(200).json({ message: `Updated water`, data: updatewater });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleted = async (req, res, next) => {
  try {
    const deletewater = await productsModel.findByIdAndDelete(
      req.params.id,
    );
    if (!deletewater) {
      return res
        .status(404)
        .json({ message: `not found ID ${req.params.id} from water` });
    }
    res.status(200).json({ message: `deleted water ` });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
