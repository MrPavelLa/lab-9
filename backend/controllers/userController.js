const User = require('../models/userModel');

exports.createUser = async (req, res) => {
  const { code, firstName, lastName, password, photo, accounts } = req.body;

  const user = new User({
    code,
    firstName,
    lastName,
    password,
    photo,
    accounts,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ _id: req.params.id });
    if (!deletedUser) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    console.log('Удаленный пользователь:', deletedUser);
    res.json({ message: 'Пользователь удален', deletedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
