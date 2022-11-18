// importing modules
const { v4: uuidv4 } = require("uuid");

// importing models
const User = require("../models/user");
const Image = require("../models/image");
const fs = require("fs");
// For uploading a new image
module.exports.upload = async (req, res) => {
  try {
    if (!req.user) {
      return res.json({
        success: false,
        message: "unauthorized access blocked",
      });
    }
    if (!req.body.name) {
      return res.json({ success: false, message: "Bad request" });
    }
    const newImage = await Image.create({
      data: fs.readFileSync(req.file.path),
      contentType: "image/jpeg",
      user: req.user._id,
      name: req.body.name,
    });

    newImage.save();
    let user = await User.findOne({ id: req.user._id });
    if (!user) return res.json({ success: false, message: "no user found" });
    user.images.push(newImage._id);
    user.save();
    fs.unlink(req.file.path, (e) => null);
    res.json({
      success: true,
      message: "New image added to the db!",
      image: newImage,
    });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "internal Server Error" });
  }
};

// To Get images List
module.exports.getImagesList = async (req, res) => {
  try {
    // getting list of images
    if(!req.user){
      return res.json({success:false,message:"Unauthenticated"})
    }
    let images = await Image.find({ user: req.user._id }).sort([
      ["createdAt", "desc"],
    ]);

    if (req.query.searchParam) {
      console.log(req.query.searchParam,"Search Params");
      images=images.filter(
        (image) => image.name && image.name.includes(req.query.searchParam)
      );
    }
    if (images) {
      // if list fetched successfully creating the response object
      const response = [
        ...images.map((image) => ({
          id: image.id,
          contentType: image.contentType,
          id: image._id,
          data: image.data,
          name: image.name || "no name",
          createdAt: image.createdAt,
        })),
      ];
      // return the imageList
      return res.json({
        success: true,
        images: [...response],
      });
    } else {
      // if list not present or not fetched
      return res.json({
        success: false,
        message: "No images found",
      });
    }
  } catch (err) {
    // if there is some other error
    console.log(err);
    return res.json({
      success: false,
      message: "Internal server error",
    });
  }
};

// delete Task
module.exports.deleteTask = async (req, res) => {
  try {
    // fetching the task from id
    let taskId = req.params.taskId;
    const deletedTask = await Task.findOneAndDelete({ id: taskId });
    if (deletedTask) {
      // if image found with the id
      return res.json({
        success: true,
        message: "task deleted Successfully",
      });
    } else {
      // if no task found with the given id
      return res.json({
        success: false,
        message: "No task found with this id",
      });
    }
  } catch (err) {
    // if there is some other error
    console.log(err);
  }
};
// update Task
module.exports.updateTask = async (req, res) => {
  try {
    // fetching the task from id
    const { title, description } = req.body;
    let taskId = req.params.taskId;
    const taksToBeUpdated = await Task.findOne({ id: taskId });

    taksToBeUpdated.title = title;
    taksToBeUpdated.description = description;
    await taksToBeUpdated.save();

    if (taksToBeUpdated) {
      // if task found with the id
      return res.json({
        success: true,
        message: "task updated Successfully",
      });
    } else {
      // if no task found with the given id
      return res.json({
        success: false,
        message: "No task found with this id",
      });
    }
  } catch (err) {
    // if there is some other error
    console.log(err);
  }
};
