const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Blog = require("../models/Blog");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const fetchuser = require("../middleware/fetchuser.js");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uname = req.user._id;
    const uploadPath = path.join(__dirname, `../public/uploads/${uname}`);
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });
const uploadSingle = upload.single("pic");

// All Blogs
router.get("/allblogs", fetchuser, async (req, res) => {
  try {
    const postt = await Blog.find().populate("postedBy", "_id user");
    return res.json(postt);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Create Blog
router.post("/createpost", fetchuser, uploadSingle, async (req, res) => {
  try {
    const { title, description } = req.body;
    const pic = req.file;
    if (!title || !description || !pic) {
      return res.json({
        status: "Failed",
        message: "All fields are required",
      });
    }
    req.user.password = undefined;
    const uname = req.user._id;
    const folderName = `${uname}`;
    filename: (req, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    };
    const blog = new Blog({
      title,
      description,
      image: `${folderName}/${pic.filename}`,
      postedBy: req.user,
    });
    const savedBlogs = await blog.save();
    return res.json({
      status: "Success",
      message: "Post Created Successfully",
      savedBlogs: savedBlogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "Failed",
      message: "Server error",
    });
  }
});

// Update Post
router.put("/:id/updateBlog", fetchuser, uploadSingle, (req, res) => {
  try {
    const { title, description } = req.body;
    const pic = req.file;
    if (!title || !description || !pic) {
      return res.json({
        status: "Failed",
        message: "All fields are required",
      });
    }
    Blog.findById(req.params.id).then((post) => {
      const buff = post.postedBy._id.toString("hex");
      const pic = req.file;
      if (buff === req.user._id) {
        if (post.image) {
          const filePath = path.join("./public/uploads", post.image);
          fs.unlinkSync(filePath, (error) => {
            if (error) {
              console.error("Error occurred while deleting the file:", error);
            } else {
              console.log("File deleted successfully.");
            }
          });
        }
        const uname = req.user._id;
        const folderName = `${uname}`;
        filename: (req, file, cb) => {
          const fileName = `${Date.now()}-${file.originalname}`;
          cb(null, fileName);
        };
        post.title = title;
        post.description = description;
        post.image = `${folderName}/${pic.filename}`;
        post.save();
        return res.json({
          status: "Success",
          message: "Blog Updated Successfully",
        });
      } else {
        res.status(403).json({
          status: "Failed",
          message: "You can only update your own post",
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "Failed",
      message: "Server error",
    });
  }
});

// Delete Blog
router.delete("/:id/deleteBlog", fetchuser, (req, res) => {
  Blog.findById(req.params.id)
    .then((post) => {
      const buff = post.postedBy._id.toString("hex");
      if (buff === req.user._id) {
        if (post.image) {
          const filePath = path.join("./public/uploads", post.image);
          fs.unlinkSync(filePath, (error) => {
            if (error) {
              console.error("Error occurred while deleting the file:", error);
            } else {
              console.log("File deleted successfully.");
            }
          });
        }
        post
          .deleteOne()
          .then(() => {
            res.status(200).json({
              status: "Success",
              message: "The Post has been deleted",
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "An error occurred" });
          });
      } else {
        res.status(403).json({
          status: "Failed",
          message: "You can only delete your own post",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "An error occurred" });
    });
});

module.exports = router;
