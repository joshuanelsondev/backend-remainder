const db = require("../models");
const User = db.User;

const getUser = async (id) => {
  return await User.findOne({
    where: { id },
  });
};

const updateUser = async (id, data) => {
  const [updated] = await User.update(data, { where: { id } });
  if (updated) {
    return await User.findOne({
      where: { id },
    });
  }

  throw new Error("User not found");
};

const deleteUser = async (id) => {
  const deleted = await User.destroy({
    where: { id },
  });

  if (deleted) {
    return true;
  }

  throw new Error("User not found");
};

module.exports = {
  getUser,
  updateUser,
  deleteUser,
};
