const Order = require('../../models/Order');
const User = require('../../models/User');
const Wear = require('../../models/Wear');
const { ObjectId } = require('mongoose').Types;
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const pdf = require('html-pdf');

module.exports = async (req, res) => {
  try {
    //prepare
    const user = await User.findOne({ _id: ObjectId(req.user.id) });
    const data = req.body.cart;
    const address = req.body.address;
    const date = req.body.date;
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
    htmlBody += `<b>Номер телефона: ${user.phone || '-'}</b><br/>`;
    htmlBody += `<b>Эл. почта: ${user.email}</b><br/>`;
    htmlBody += `<b>Заказ на дату: ${new Date(date).toLocaleDateString('en-GB')} ${new Date(date).toLocaleTimeString(
      'en-GB'
    )}</b><br/>`;
    htmlBody += `<b>Адрес: ${address}</b><br/>`;
    htmlBody += `<h1>\tТовары:</h1><ol>`;
    const wears = [];
    let sum = 0;
    //start transaction
    const session = await mongoose.startSession();
    session.startTransaction();
    for (let j = 0; j < data.length; j++) {
      htmlBody += `<li>${data[j].title} (размер: ${data[j].size}) - цена: ${data[j].price} ${data[j].currency}</li>`;
      await Wear.updateOne({ _id: data[j]._id }, { $inc: { quantity: -1, popularity: 5 } }).session(session);
      sum += data[j].price;
      wears.push({ wearId: ObjectId(data[j]._id), size: data[j].size });
    }
    htmlBody += '</ol><hr/>';
    htmlBody += `<b><i>Итог = ${sum} ${data[0].currency}</b></i>`;
    const order = new Order({
      data: wears,
      userId: ObjectId(req.user.id),
      orderDate: Date.now(),
      onDate: new Date(date),
      address: address,
    });
    await order.save({ session: session });
    await session.commitTransaction();
    session.endSession();
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
