const { Tasks } = require("../models/Models");
const ApiError = require("../error/ApiError");

class TaskController {
  async create(req, res, next) {
    try {
      const { title, description, dueDate, isComplete } = req.body;

      if (!title) {
        return next(ApiError.badRequest("Название задачи обязательно"));
      }

      const task = await Tasks.create({
        title,
        description: description || null,
        dueDate: dueDate || null,
        isComplete: isComplete || false,
        userId: req.user.id,
      });

      return res.json(task);
    } catch (e) {
      return next(ApiError.internal(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const tasks = await Tasks.findAll();
      return res.json(tasks);
    } catch (e) {
      return next(ApiError.internal(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const task = await Tasks.findByPk(id);

      if (!task) {
        return next(ApiError.notFound("Задача не найдена"));
      }

      return res.json(task);
    } catch (e) {
      return next(ApiError.internal(e.message));
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const [updated] = await Tasks.update(req.body, {
        where: { id, userId: req.user.id },
        returning: true,
      });
      if (updated) {
        const updatedTask = await Tasks.findOne({ where: { id } });
        return res.json(updatedTask);
      }
      return next(ApiError.badRequest("Задача не найдена"));
    } catch (e) {
      next(ApiError.internal("Ошибка при обновлении задачи"));
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await Tasks.destroy({
        where: { id, userId: req.user.id },
      });
      if (deleted) {
        return res.json({ message: "Задача удалена" });
      }
      return next(ApiError.badRequest("Задача не найдена"));
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }
  async toggleComplete(req, res) {
    try {
      const { id } = req.params;
      const task = await Tasks.findOne({ where: { id, userId: req.user.id } });
      if (!task) {
        return next(ApiError.badRequest("Задача не найдена"));
      }
      const updated = await task.update({ isComplete: !task.isComplete });
      return res.json(updated);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }
}

module.exports = new TaskController();
