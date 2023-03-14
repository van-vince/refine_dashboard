import mongoose from "mongoose";
// const AutoIncrement = require('mongoose-sequence')(mongoose)

const CustomerSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true
     },
    location: { 
        type: String, 
        required: true 
    },
    contact: {
         type: String, 
         required: true
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

// CustomerSchema.plugin(AutoIncrement, {
//     inc_field: 'counter',
//     id: 'idCus',
//     start_seq: 0
//   })

const customerModel = mongoose.model("Customer", CustomerSchema);

export default customerModel;