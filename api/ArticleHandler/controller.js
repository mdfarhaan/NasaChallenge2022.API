const { getdb } = require("../../utils/database");
const { generateUserId } = require("../../utils/helpers");

exports.getArticle = async (req, res) => {
  const db = await getdb();
  const { userId } = req.params;
  const data = await db.collection("articles").findOne({ userId });
  if (data) {
    res.status(200).json({ success: true, message: "User found", data });
  } else {
    res.status(200).json({ success: false, message: "User not found" });
  }
};

exports.getAllArticle = async (req, res) => {
  const db = await getdb();
  const data = await db.collection("articles").find().sort({ publishedAt: -1 });
  if (data) {
    res.status(200).json({ success: true, data });
  }
};

exports.addArticle = async (req, res) => {
  const db = await getdb();

  const article = {
    articleId: generateUserId(),
    userId: req.body.firstName,
    title: req.body.title,
    private: req.body.private,
    email: req.body.email,
    role: req.body.role,
    organization: req.body.organization,
    domain: req.body.domain,
    follwing: [],
  };

  // await db.collection("articles").insertOne(user);
  res
    .status(200)
    .json({ success: true, message: "Article added successfully" });
};
