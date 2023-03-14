import mongoose from "mongoose";
import Inc from "mongoose-sequence";

const AutoIncrement = Inc(mongoose); 

const InvoiceSchema = mongoose.Schema(
  {
    companyDetails:[{
        name: String,
        location: String,
        contact: String,
    }],
    customerDetails:[{
        name: String,
        location: String,
        contact: String,
    }],
    invoiceId: {
      type: String,
      required: false,
      trim: true,
    },
    warehouse: {
      type: String,
      required: false,
      trim: true,
    },
    invoiceDetails: [{
        name: String,
        quantity: Number,
        price: Number,
        sum: Number,
    }],
    tax: {
        type: Number,
        required: false,
        trim: true,
      },
    discount: {
        type: Number,
        required: false,
        trim: true,
      },
    total: {
        type: Number,
        required: false,
        trim: true,
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

    InvoiceSchema.plugin(AutoIncrement, {
      inc_field: 'counter',
      id: 'idInv',
      start_seq: 0
    })

const invoiceModel = mongoose.model("Invoice", InvoiceSchema);

export default invoiceModel;