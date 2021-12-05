const Order = require('../models/Order');
const User = require('../models/User');
const { ObjectId } = require('mongoose').Types;
const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  try {
    const user = await User.findOne({ _id: ObjectId(req.user.id) });
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASS,
      },
    });
    let htmlBody = '';
    htmlBody += `<b>User: ${user.name} ${user.lastname}</b><br/>`;
    htmlBody += `<b>Email: ${user.email}</b><br/><br/>`;
    htmlBody += `<h1>\tPurchases:</h1></br><ol>`;
    const data = req.body;
    const wears = [];
    let sum = 0;
    data.forEach((e) => {
      htmlBody += `<li>${e.title} - price: ${e.price} ${e.currency} <b>x${e.count}</b></li>`;
      for (let i = 0; i < e.count; i++) {
        sum += e.price;
        wears.push(ObjectId(e._id));
      }
    });
    htmlBody += '</ol><br/><hr/>';
    htmlBody += `<b><i>Total = ${sum}</b></i>`;
    const order = new Order({ data: wears, userId: ObjectId(req.user.id), orderDate: Date.now() });
    order.save();
    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: 'check from "Clothes"',
      text: htmlBody,
      html: htmlBody,
    });
    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to: user.email,
      subject: 'check from "Clothes"',
      text: htmlBody,
      html: htmlBody,
    });
    res.status(200).json({ message: 'Order created' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Somthing wrong' });
  }
};
