import Invoice from "../models/invoice.js";
import User from "../models/user.js";

import mongoose from "mongoose";


const getAllInvoices = async (req, res) => {
    const { _end, _order, _start, _sort, name_like = "", location = "", } = req.query;

    const query = {};

    if (location !== "") {
        query.location = location;
    }

    if (name_like) {
        query.name = { $regex: name_like, $options: "i" };
    }

    try {
        const count = await Invoice.countDocuments({ query });

        const invoices = await Invoice.find(query)
            .limit(_end)
            .skip(_start)
            .sort({ [_sort]: _order });

        res.header("x-total-count", count);
        res.header("Access-Control-Expose-Headers", "x-total-count");

        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getInvoiceDetail = async (req, res) => {
    const { id } = req.params;
    const invoiceExists = await Invoice.findOne({ _id: id }).populate(
        "creator",
    );

    if (invoiceExists) {
        res.status(200).json(invoiceExists);
    } else {
        res.status(404).json({ message: "Invoice not found" });
    }
};

const createInvoice = async (req, res) => {
    try {
        const { companyDetails, customerDetails, invoiceDetails, invoiceId, warehouse, subtotal, tax, discount, total, email} = req.body;

        const session = await mongoose.startSession();
        session.startTransaction();

        const user = await User.findOne({ email }).session(session);

        if (!user) throw new Error("User not found");

        // const photoUrl = await cloudinary.uploader.upload(photo,);
        // console.log (photoUrl)

        const newInvoice = await Invoice.create({
            companyDetails, 
            customerDetails, 
            invoiceDetails, 
            invoiceId,
            warehouse, 
            subtotal, 
            tax, 
            discount, 
            total,
            creator: user._id,
        });

        user.allInvoices.push(newInvoice._id);
        await user.save({ session });

        await session.commitTransaction();

        res.status(200).json({ message: "Invoice created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, location, contact, } =
            req.body;

        //const photoUrl = await cloudinary.uploader.upload(photo);

        await Invoice.findByIdAndUpdate(
            { _id: id },
            {
                name,
                location,
                contact,
            },
        );

        res.status(200).json({ message: "Invoice updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteInvoice = async (req, res) => {
    try {
        const { id } = req.params;

        const invoiceToDelete = await Invoice.findById({ _id: id }).populate(
            "creator",
        );

        if (!invoiceToDelete) throw new Error("Invoice not found");

        const session = await mongoose.startSession();
        session.startTransaction();

        invoiceToDelete.remove({ session });
        invoiceToDelete.creator.allInvoices.pull(invoiceToDelete);

        await invoiceToDelete.creator.save({ session });
        await session.commitTransaction();

        res.status(200).json({ message: "Invoice deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    getAllInvoices,
    getInvoiceDetail,
    createInvoice,
    updateInvoice,
    deleteInvoice,
};