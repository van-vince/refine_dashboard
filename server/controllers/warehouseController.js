import Warehouse from "../models/warehouse.js";
import User from "../models/user.js";

import mongoose from "mongoose";


const getAllWarehouses = async (req, res) => {
    const { _end, _order, _start, _sort, name_like = "", location = "", } = req.query;

    const query = {};

    if (location !== "") {
        query.location = location;
    }

    if (name_like) {
        query.name = { $regex: name_like, $options: "i" };
    }

    try {
        const count = await Warehouse.countDocuments({ query });

        const warehouses = await Warehouse.find(query)
            .limit(_end)
            .skip(_start)
            .sort({ [_sort]: _order });

        res.header("x-total-count", count);
        res.header("Access-Control-Expose-Headers", "x-total-count");

        res.status(200).json(warehouses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getWarehouseDetail = async (req, res) => {
    const { id } = req.params;
    const warehouseExists = await Warehouse.findOne({ _id: id }).populate(
        "creator",
    );

    if (warehouseExists) {
        res.status(200).json(warehouseExists);
    } else {
        res.status(404).json({ message: "Warehouse not found" });
    }
};

const createWarehouse = async (req, res) => {
    try {
        const { name, location, email} = req.body;

        const session = await mongoose.startSession();
        session.startTransaction();

        const user = await User.findOne({ email }).session(session);

        if (!user) throw new Error("User not found");

        // const photoUrl = await cloudinary.uploader.upload(photo,);
        // console.log (photoUrl)

        const newWarehouse = await Warehouse.create({
            name,
            location,
            creator: user._id,
        });

        user.allWarehouses.push(newWarehouse._id);
        await user.save({ session });

        await session.commitTransaction();

        res.status(200).json({ message: "Warehouse created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateWarehouse = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, location, } =
            req.body;

        //const photoUrl = await cloudinary.uploader.upload(photo);

        await Warehouse.findByIdAndUpdate(
            { _id: id },
            {
                name,
                location,
            },
        );

        res.status(200).json({ message: "Warehouse updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteWarehouse = async (req, res) => {
    try {
        const { id } = req.params;

        const warehouseToDelete = await Warehouse.findById({ _id: id }).populate(
            "creator",
        );

        if (!warehouseToDelete) throw new Error("Warehouse not found");

        const session = await mongoose.startSession();
        session.startTransaction();

        warehouseToDelete.remove({ session });
        warehouseToDelete.creator.allWarehouses.pull(warehouseToDelete);

        await warehouseToDelete.creator.save({ session });
        await session.commitTransaction();

        res.status(200).json({ message: "Warehouse deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    getAllWarehouses,
    getWarehouseDetail,
    createWarehouse,
    updateWarehouse,
    deleteWarehouse,
};