import mongoose from "mongoose";
// const AutoIncrement = require('mongoose-sequence')(mongoose)

const UserSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    avatar: {
         type: String, 
         required: true 
        },
    allProducts: [{
         type: mongoose.Schema.Types.ObjectId, 
         ref: "Product" 
        }],
    allCustomers: [{
         type: mongoose.Schema.Types.ObjectId, 
         ref: "Customer" 
        }],
    allCategories: [{
         type: mongoose.Schema.Types.ObjectId, 
         ref: "Category" 
        }],
    allWarehouses: [{
         type: mongoose.Schema.Types.ObjectId, 
         ref: "Warehouse" 
        }],
    allInvoices: [{
         type: mongoose.Schema.Types.ObjectId, 
         ref: "Warehouse" 
        }],
    },
    {
        timestamps: true,
    }
    );

    // UserSchema.plugin(AutoIncrement, {
    //     inc_field: 'counter',
    //     id: 'idUse',
    //     start_seq: 0
    //   })

const userModel = mongoose.model("User", UserSchema);

export default userModel;