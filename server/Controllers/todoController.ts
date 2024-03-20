const { error, success } = require("../Utils/responseWrapper");
const Todo = require("../model/todoModel");
import { Response, Request } from "express";

exports.getCreateTodo = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    if (!title || !description)
      return res.send(error(404, `Please provide TITLE & DESCRIPTION fields`));
    const newTodo = await Todo.create({
      title,
      description,
      owner: req.user._id,
    });
    req.user.todos.push(newTodo._id);
    await req.user.save();
    res.send(success(200, newTodo));
  } catch (e) {
    res.send(error(500, e.message));
  }
};

exports.getAllTodo = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find({ owner: req.user._id });
    res.send(success(200, todos));
  } catch (e) {
    res.send(error(500, e.message));
  }
};

exports.getToggleProgress = async (req: Request, res: Response) => {
  try {
    const { todoId } = req.body;
    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.send(error(404, "Todo Is Not Found"));
    }
    todo.isCompleted = !todo.isCompleted;
    await todo.save();

    return res.send(success(200, todo));
  } catch (e) {
    res.send(error(500, e.message));
  }
};

exports.getUpdateTodo = async (req: Request, res: Response) => {
  try {
    const { todoId, description, isCompleted, title } = req.body;
    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.send(error(404, "Todo Is Not Found"));
    }

    if (isCompleted) todo.isCompleted = !todo.isCompleted;
    if (description) todo.description = description;
    if (title) todo.title = title;
    await todo.save();
    return res.send(success(200, todo));
  } catch (e) {
    res.send(error(500, e.message));
  }
};

exports.getRemoveTodo = async (req: Request, res: Response) => {
  try {
    const { todoId } = req.body;
    if (!todoId) {
      return res.send(error(404, "Provide Todo ID"));
    }
    let todo = await Todo.deleteOne({ _id: todoId });

    if (!todo.acknowledged) {
      return res.send(error(502, "Server Error Todo is Not Deleted"));
    }
    const newTodo = await Todo.find({ owner: req.user._id });
    return res.send(
      success(200, { message: "Todo Removed Succesfully", newTodo })
    );
  } catch (e) {
    res.send(error(500, e.message));
  }
};
