import nodemailer from "nodemailer";
import User from "../models/userModel.js";
import Orders from "../models/ordersModel.js";
import generateOTP from "../config/otpConfig.js";
const otpStore = new Map();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
const sendOTP = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP for Transaction Confirmation",
    text: `Your OTP is: ${otp}. It is valid for 10 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP sent successfully!");
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
};

const requestOTP = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const otp = generateOTP();
  otpStore.set(email, { otp, expiresAt: Date.now() + 10 * 60 * 1000 }); // Expires in 10 minutes

  try {
    await sendOTP(email, otp);
    res.status(200).json({ message: "OTP sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send OTP", error });
  }
};

const confirmOTP = async (req, res) => {
  const { email, otp } = req.body;

  if (!otpStore.has(email)) {
    return res
      .status(400)
      .json({ message: "OTP not requested for this email" });
  }

  const storedOtp = otpStore.get(email);
  if (storedOtp.expiresAt < Date.now()) {
    otpStore.delete(email);
    return res.status(400).json({ message: "OTP expired" });
  }

  if (storedOtp.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  otpStore.delete(email);
  res.status(200).json({ message: "Transaction confirmed!" });
};

const createOrder = async (req, res) => {
  try {
    const { email, books, addressId, paymentMethod } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User does not exist" });

    // Calculate total amount
    let totalAmount = 0;
    books.forEach((book) => {
      totalAmount += book.price * book.quantity; // Assuming price is passed in the payload
    });

    // Create and save the order
    const newOrder = await Orders.create({
      user: user._id,
      books, 
      address: addressId,
      paymentMethod,
      totalAmount,
    });

    // Respond with the created order
    return res
      .status(200)
      .json({ message: "Order created successfully", newOrder });
  } catch (err) {
    console.error("Error creating order:", err.message);
    return res
      .status(500)
      .json({ message: "Order creation failed", error: err.message });
  }
};

const getOrderDetails = async (req, res) => {
    try {
      const { orderId } = req.params;
  
      // Find the order by ID and populate the user and address fields
      const order = await Orders.findById(orderId)
        .populate('user', 'username email') // Populate only specific fields from the User model
        .populate('address', 'street city state postalCode country'); // Populate specific fields from Address model
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      // Respond with the order details
      return res.status(200).json({ message: 'Order details fetched successfully', order });
    } catch (err) {
      console.error('Error fetching order details:', err.message);
      return res.status(500).json({ message: 'Failed to fetch order details', error: err.message });
    }
  };
  

export { requestOTP, confirmOTP, createOrder, getOrderDetails };
