const { getUser, updateUser, deleteUser } = require("../services/userService");

const getUserController = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await getUser(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateUserController = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const user = await updateUser(id, updateData);
    return res.status(200).json(user);
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};

const deleteUserController = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteUser(id);
    return res.status(204).send();
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUserController,
  updateUserController,
  deleteUserController,
};
