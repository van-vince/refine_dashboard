import mongoose from "mongoose";
import Inc from "mongoose-sequence";

const AutoIncrement = Inc(mongoose); 

const ProductSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true
     },
    description: { 
        type: String, 
        required: true 
    },
    category: {
         type: String, 
         required: true
         },
    price: { 
        type: Number, 
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true 
    },
    photo: {
         type: String, 
         required: false
        },
    creator: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: "User" 
        },
    },
    {
        timestamps: true,
    }
    );

    ProductSchema.plugin(AutoIncrement, {
        inc_field: 'counter',
        id: 'idProd',
        start_seq: 0
      })

const productModel = mongoose.model("Product", ProductSchema);

export default productModel;