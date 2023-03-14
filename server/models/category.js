import mongoose from "mongoose";
// const AutoIncrement = require('mongoose-sequence')(mongoose)

const CategorySchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true
     },
    description: { 
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

// CategorySchema.plugin(AutoIncrement, {
//     inc_field: 'counter',
//     id: 'idCus',
//     start_seq: 0
//   })

const categoryModel = mongoose.model("Category", CategorySchema);

export default categoryModel;