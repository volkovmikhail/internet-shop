const User = require('../../models/User');
const { ObjectId } = require('mongoose').Types;

const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegex = /^(\+375|80)(29|25|44|33|17)(\d{3})(\d{2})(\d{2})$/;

module.exports = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const condidates = await User.find({ email });
    if (condidates.length > 1) {
      return res.status(400).json({
        message: 'Пользователь с такой почтой существует',
      });
    }

    if (condidates.length) {
      if (condidates[0]._id.toString() !== req.user.id.toString()) {
        return res.status(400).json({
          message: 'Пользователь с такой почтой существует',
        });
      }
    }

    const phoneToSave = phone.replaceAll('(', '').replaceAll(')', '').replaceAll('-', '').replaceAll(' ', '');

    if (!email.match(regexEmail)) {
      return res.status(400).json({
        message: 'Неверный email',
      });
    }

    if (!phoneToSave.match(phoneRegex)) {
      return res.status(400).json({
        message: 'Неверный номер телефона',
      });
    }

    const result = await User.updateOne({ _id: ObjectId(req.user.id) }, { name, email, phone: phoneToSave });
    if (!result.modifiedCount) {
      return res.status(500).json({
        message: 'Серверная ошибка',
      });
    }
    return res.status(200).json({
      message: 'Данные обновлены',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Somthing wrong SERVER ERROR',
    });
    console.log(error);
  }
};
