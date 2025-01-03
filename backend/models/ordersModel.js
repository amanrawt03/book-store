import mongoose from 'mongoose';
const ordersSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  books: [
    {
      title: {
        type: String,
        required: true,
      },
      author: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address', // Reference to the Address model
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ['UPI', 'COD'], // Add more methods as required
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ordersModel = mongoose.model('Orders', ordersSchema);
export default ordersModel;