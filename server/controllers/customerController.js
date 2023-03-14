import Customer from "../models/customer.js";
import User from "../models/user.js";

import mongoose from "mongoose";


const getAllCustomers = async (req, res) => {
    const { _end, _order, _start, _sort, name_like = "", location = "", } = req.query;

    const query = {};

    if (location !== "") {
        query.location = location;
    }

    if (name_like) {
        query.name = { $regex: name_like, $options: "i" };
    }

    try {
        const count = await Customer.countDocuments({ query });

        const customers = await Customer.find(query)
            .limit(_end)
            .skip(_start)
            .sort({ [_sort]: _order });

        res.header("x-total-count", count);
        res.header("Access-Control-Expose-Headers", "x-total-count");

        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCustomerDetail = async (req, res) => {
    const { id } = req.params;
    const customerExists = await Customer.findOne({ _id: id }).populate(
        "creator",
    );

    if (customerExists) {
        res.status(200).json(customerExists);
    } else {
        res.status(404).json({ message: "Customer not found" });
    }
};

const createCustomer = async (req, res) => {
    try {
        const { name, location, contact, email} = req.body;

        const session = await mongoose.startSession();
        session.startTransaction();

        const user = await User.findOne({ email }).session(session);

        if (!user) throw new Error("User not found");

        // const photoUrl = await cloudinary.uploader.upload(photo,);
        // console.log (photoUrl)

        const newCustomer = await Customer.create({
            name,
            location,
            contact,
            creator: user._id,
        });

        user.allCustomers.push(newCustomer._id);
        await user.save({ session });

        await session.commitTransaction();

        res.status(200).json({ message: "Customer created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, location, contact, } =
            req.body;

        //const photoUrl = await cloudinary.uploader.upload(photo);

        await Customer.findByIdAndUpdate(
            { _id: id },
            {
                name,
                location,
                contact,
            },
        );

        res.status(200).json({ message: "Customer updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;

        const customerToDelete = await Customer.findById({ _id: id }).populate(
            "creator",
        );

        if (!customerToDelete) throw new Error("Customer not found");

        const session = await mongoose.startSession();
        session.startTransaction();

        customerToDelete.remove({ session });
        customerToDelete.creator.allCustomers.pull(customerToDelete);

        await customerToDelete.creator.save({ session });
        await session.commitTransaction();

        res.status(200).json({ message: "Customer deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    getAllCustomers,
    getCustomerDetail,
    createCustomer,
    updateCustomer,
    deleteCustomer,
};