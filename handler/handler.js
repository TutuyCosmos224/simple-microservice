const userService = require('../service/service.js');

const wow = async (req, res, next) =>{
    res.send("wow");
}


const postUser = async (req, res, next) => {
  // eslint-disable-next-line object-curly-newline
  const user = req.body;
  try {
    const newUser = await userService.createUser(user);
    res.status(201).json({ success: true, message: 'success', data: newUser });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ success: false, message: err.message, data: [] });
    } else {
      next(err);
    }
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getAll();

    res.status(200).json({ success: true, message: 'success', data: users });
    console.log('users gotten');
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ success: false, message: err.message, data: [] });
    } else {
      next(err);
    }
  }
};

const getById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await userService.getUserById(userId);

    res.status(200).json({ success: true, message: 'success', data: user });
    console.log('user gotten');
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ success: false, message: err.message, data: [] });
    } else {
      next(err);
    }
  }
};

const updateUser = async (req, res, next) => {
  const { userId } = req.params;
  const user = req.body;
  try {
    const updatedUser = await userService.updateUser(userId, user);

    res.status(200).json({ success: true, message: 'success', data: updatedUser });
    console.log('user updated');
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ success: false, message: err.message, data: [] });
    } else {
      next(err);
    }
  }
};

const deleteUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await userService.deleteUser(userId);

    res.status(200).json({ success: true, message: 'success', data: user });
    console.log('user deleted');
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ success: false, message: err.message, data: [] });
    } else {
      next(err);
    }
  }
};


// eslint-disable-next-line object-curly-newline
module.exports = {
    wow,
  postUser,
  getUsers,
  getById,
  updateUser,
  deleteUser,
};