import mongoose from "mongoose";
// const AutoIncrement = require('mongoose-sequence')(mongoose)

const WarehouseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true
     },
    location: { 
        type: String, 
        required: true 
    },
    warehouseRel: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: "Prodcut" 
        },
    },
    {
        timestamps: true,
    }
    );

    // WarehouseSchema.plugin(AutoIncrement, {
    //     inc_field: 'counter',
    //     id: 'idInv',
    //     start_seq: 0
    //   })

const warehouseModel = mongoose.model("Warehouse", WarehouseSchema);

export default warehouseModel;