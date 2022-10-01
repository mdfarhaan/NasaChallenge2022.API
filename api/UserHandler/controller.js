const { getdb } = require("../../utils/database");
const { generateUserId } = require("../../utils/helpers");

exports.getUser = async (req, res) => {
  const db = await getdb();
  const { userId } = req.params;
  const data = await db.collection("users").findOne({ userId });
  if (data) {
    res.status(200).json({ success: true, message: "User found", data });
  } else {
    res.status(200).json({ success: false, message: "User not found" });
  }
};

exports.addUser = async (req, res) => {
  const db = await getdb();

  const user = {
    userId: generateUserId(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    role: req.body.role,
    organization: req.body.organization,
    domain: req.body.domain,
    follwing: [],
  };

  await db.collection("users").insertOne(user);
  res.status(200).json({ success: true, message: "User added successfully" });
};
