import customerModel from "../models/customers.model.js";

export const create = async (req, res, next) => {
  try {
    const newCustomers = await customerModel.create(req.validatedData);
    res.status(201).send({ message: `create customers`, data: newCustomers });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const getcustomer = await customerModel.find();
    res.status(200).send({
      message: `find all customers`,
      count: getcustomer.length,
      data: getcustomer,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const getOneCustomers = await customerModel.findById(req.params.id);
    if (!getOneCustomers) {
      return res
        .status(404)
        .send({ message: `not found ID ${req.params.id} from Customers` });
    }
    res.status(200).send({ message: `find customer`, data: getOneCustomers });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const updateCustomer = await customerModel.findByIdAndUpdate(
      req.params.id,
      req.validatedData,
      { new: true, runValidators: true },
    );
    if (!updateCustomer) {
      return res.status(404).send({
        message: `not found ID ${req.params.id} from Customers`,
        data: updateCustomer,
      });
    }
    res.status(200).send({ message: `Update customer`, data: updateCustomer });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleted = async (req, res, next) => {
  try {
    const deleteCustomer = await customerModel.findByIdAndDelete(req.params.id);
    if (!deleteCustomer) {
      return res
        .status(404)
        .send({ message: `Not found ID ${req.params.id} from Customers` });
    }
    res
      .status(200)
      .send({ message: `Deleted customer ID ${req.params.id} from Customers` });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
