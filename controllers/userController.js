const { getUser, updateUser, deleteUser } = require("../services/userService");

const getUserController = async (req, res) => {
  const { id } = req.params;
  const user = await getUser(id);
  return res.status(200).json(user);
};

const updateUserController = async (req, res) => {
  const { id } = req.params;
  const updatedUser = await updateUser(id, req.body);
  return res.status(200).json(updatedUser);
};

const deleteUserController = async (req, res) => {
  const { id } = req.params;
  const deleted = await deleteUser(id);
  if (deleted) {
    return res.status(200).json({ message: `User with id (${id}) deleted` });
  }
};
