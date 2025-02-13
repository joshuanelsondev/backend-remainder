const { getUser, updateUser, deleteUser } = require("../services/userService");

const getUserController = async (req, res) => {
  try {
    const targetUserId = req.params.id || req.user.id;

    const user = await getUser(targetUserId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (req.params.id && !req.user.isAdmin) {
      return res.status(403).json({ error: "Admin privileges required" });
    }

    const responseData = req.params.id
      ? user
      : {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          dateOfBirth: user.dateOfBirth,
        };

    return res.status(200).json(responseData);
  } catch (error) {
    console.error("Error fetching user:", error.message);
    return res.status(500).json({ error: "Failed to fetch user data." });
  }
};

const updateUserController = async (req, res) => {
  const { id } = req.user;
  const updateData = req.body;

  try {
    const updatedUser = await updateUser(id, updateData);
    return res.status(200).json(updatedUser);
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};

const deleteUserController = async (req, res) => {
  const { userId } = req.params;
  const { id, isAdmin } = req.user;

  try {
    // Restrict non-admins from deleting other users
    if (userId && !isAdmin) {
      return res
        .status(403)
        .json({ error: "Admin privileges required to delete other users." });
    }

    const targetUserId = userId || id;

    const deleted = await deleteUser(targetUserId);

    if (!deleted) {
      return res.status(404).json({ error: "User not found." });
    }

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
