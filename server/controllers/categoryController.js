import Category from "../models/category.js";
import User from "../models/user.js";

import mongoose from "mongoose";


const getAllCategories = async (req, res) => {
    const { _end, _order, _start, _sort, name_like = "", description = "", } = req.query;

    const query = {};

    if (description !== "") {
        query.description = description;
    }

    if (name_like) {
        query.name = { $regex: name_like, $options: "i" };
    }

    try {
        const count = await Category.countDocuments({ query });

        const categorys = await Category.find(query)
            .limit(_end)
            .skip(_start)
            .sort({ [_sort]: _order });

        res.header("x-total-count", count);
        res.header("Access-Control-Expose-Headers", "x-total-count");

        res.status(200).json(categorys);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCategoryDetail = async (req, res) => {
    const { id } = req.params;
    const categoryExists = await Category.findOne({ _id: id }).populate(
        "creator",
    );

    if (categoryExists) {
        res.status(200).json(categoryExists);
    } else {
        res.status(404).json({ message: "Category not found" });
    }
};

const createCategory = async (req, res) => {
    try {
        const { name, description, email} = req.body;

        const session = await mongoose.startSession();
        session.startTransaction();

        const user = await User.findOne({ email }).session(session);

        if (!user) throw new Error("User not found");

        // const photoUrl = await cloudinary.uploader.upload(photo,);
        // console.log (photoUrl)

        const newCategory = await Category.create({
            name,
            description,
            creator: user._id,
        });

        user.allCategories.push(newCategory._id);
        await user.save({ session });

        await session.commitTransaction();

        res.status(200).json({ message: "Category created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, } =
            req.body;

        //const photoUrl = await cloudinary.uploader.upload(photo);

        await Category.findByIdAndUpdate(
            { _id: id },
            {
                name,
                description,
            },
        );

        res.status(200).json({ message: "Category updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const categoryToDelete = await Category.findById({ _id: id }).populate(
            "creator",
        );

        if (!categoryToDelete) throw new Error("Category not found");

        const session = await mongoose.startSession();
        session.startTransaction();

        categoryToDelete.remove({ session });
        categoryToDelete.creator.allCategorys.pull(categoryToDelete);

        await categoryToDelete.creator.save({ session });
        await session.commitTransaction();

        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    getAllCategories,
    getCategoryDetail,
    createCategory,
    updateCategory,
    deleteCategory,
};