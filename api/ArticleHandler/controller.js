const { getdb } = require("../../utils/database");
const { generateUserId } = require("../../utils/helpers");
const { S3 } = require("../../utils/s3");
const { config } = require("../../utils/config");
const axios = require("axios");

exports.getArticle = async (req, res) => {
  const db = await getdb();
  const { articleId } = req.params;
  const data = await db.collection("articles").findOne({ articleId });
  if (data) {
    res.status(200).json({ success: true, message: "Article found", data });
  } else {
    res.status(200).json({ success: false, message: "Article not found" });
  }
};

exports.getAllArticle = async (req, res) => {
  const db = await getdb();
  const data = await db
    .collection("articles")
    .find()
    .sort({ publishedAt: -1 })
    .toArray();
  if (data) {
    res.status(200).json({ success: true, data });
  }
};

exports.addArticle = async (req, res) => {
  const { file } = req.files;
  let { form } = req.body;
  form = JSON.parse(form);

  const params = {
    Bucket: config.S3Bucket,
    Key: `${generateUserId()}.pdf`,
    Body: file.data,
    ContentType: "application/pdf",
  };

  const fileUpload = await S3.upload(params).promise();
  const fileUploaded = {
    fileName: file.name,
    location: fileUpload.Location,
    size: file.size,
    type: file.mimetype,
  };
  console.log("File uploaded");
  try {
    const getModel = await axios.post(
      "https://f36b-183-82-25-171.in.ngrok.io/nlpmodel/",
      {
        url: fileUploaded.location,
      }
    );
    const tags = getModel.data.keywords.map((tag) => tag[0]);
    const db = await getdb();
    const articleId = generateUserId();

    const article = {
      articleId,
      userId: "QwGhSxSb",
      summary: getModel.data.summary,
      title: form.title,
      fileLocation: fileUploaded.location,
      fileName: fileUploaded.fileName,
      authors: [],
      public: form.public,
      publishedAt: form.publishedAt,
      acquiredAt: form.acquiredAt,
      collobrations: [],
      type: form.type,
      tags: tags,
      metrics: {
        upvotes: 0,
        downVotes: 0,
        views: 0,
      },
    };

    await db.collection("articles").insertOne(article);
    res.status(200).json({
      success: true,
      message: "Article added successfully",
      articleId,
    });
  } catch (err) {
    console.log({ err: "API Call", message: err.message });
    res.status(500).json({ success: false, message: err.message });
  }
};
