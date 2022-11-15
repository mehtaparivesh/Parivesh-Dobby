// importing modules
const { v4: uuidv4 } = require("uuid");
// importing models
const Task = require("../models/user");

// For creating a new task
module.exports.upload = async (req, res) => {
  try {
    // destructuring the title and description from req.body
    const { title, description } = req.body;

    if (!title || !description) {
      return res.json({
        success: false,
        message: "title and description is required",
      });
    }

    // creating the new task with a unique id
    let task = await Task.create({
      title,
      description,
      id: uuidv4(),
    });
    if (task) {
      // if task created
      return res.json({
        success: true,
        message: `Image created`,
        taskId: task.id,
      });
    } else {
      // if task not created
      return res.json({
        success: false,
        massage: "failed to join race",
      });
    }
  } catch (err) {
    // if there is some other error
    console.log(err);
    return res.json({
      success: false,
      error: "internal server error",
    });
  }
};

// To Get Task List
module.exports.getTaskList = async (req, res) => {
  try {
    // getting list of tasks
    let tasks = await Task.find();

    if (tasks) {
      // if list fetched successfully creating the response object
      const response = [
        ...tasks.map((task) => ({
          title: task.title,
          description: task.description,
          id: task.id,
        })),
      ];
      // return the taskList
      return res.json({
        success: true,
        tasks: response,
      });
    } else {
      // if list not present or not fetched
      return res.json({
        success: false,
        message: "No tasks found",
      });
    }
  } catch (err) {
    // if there is some other error
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
      // if task found with the id
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
