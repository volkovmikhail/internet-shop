const Order = require('../../models/Order');
const User = require('../../models/User');
const { ObjectId } = require('mongoose').Types;
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const pdf = require('html-pdf');

module.exports = async (req, res) => {
  try {
    //prepare
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
    //making html
    let htmlBody = '';
    htmlBody += `<b>Пользователь: ${user.name} ${user.lastname}</b><br/>`;
    htmlBody += `<b>Эл. почта: ${user.email}</b><br/><br/>`;
    htmlBody += `<h1>\tТовары:</h1></br><ol>`;
    const data = req.body;
    const wears = [];
    let sum = 0;
    data.forEach((e) => {
      htmlBody += `<li>${e.title} - цена: ${e.price} ${e.currency} <b>x${e.count}</b></li>`;
      for (let i = 0; i < e.count; i++) {
        sum += e.price;
        wears.push(ObjectId(e._id));
      }
    });
    htmlBody += '</ol><br/><hr/>';
    htmlBody += `<b><i>Итог = ${sum} ${data[0].currency}</b></i>`;
    const session = await mongoose.startSession();
    session.startTransaction();
    const order = new Order({ data: wears, userId: ObjectId(req.user.id), orderDate: Date.now() });
    await order.save();
    //send
    pdf.create(htmlBody).toBuffer(async function (err, buffer) {
      if (err) {
        throw err;
      }
      await transporter.sendMail({
        from: process.env.ADMIN_EMAIL,
        to: process.env.ADMIN_EMAIL,
        subject: 'check from "Clothes"',
        text: htmlBody,
        html: htmlBody,
        attachments: [
          {
            filename: `чек_${user.name}_${user.lastname}.pdf`,
            content: buffer,
            contentType: 'application/pdf',
          },
        ],
      });
      await transporter.sendMail({
        from: process.env.ADMIN_EMAIL,
        to: user.email,
        subject: 'check from "Clothes"',
        text: htmlBody,
        html: htmlBody,
        attachments: [
          {
            filename: `чек_${user.name}_${user.lastname}.pdf`,
            content: buffer,
            contentType: 'application/pdf',
          },
        ],
      });
    });
    res.status(200).json({ message: 'Order created' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Somthing wrong' });
  }
};
