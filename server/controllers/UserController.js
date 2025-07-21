const ApiError = require("../error/ApiError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const { Users } = require("../models/Models");

const generateJwt = (id, login, email) => {
  return jwt.sign({ id, login, email }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    const { login, email, password } = req.body;
    if (!email) {
      return next(ApiError.badRequest("Некорректная эл.почта"));
    }

    if (!login) {
      return next(ApiError.badRequest("Некорректный логин"));
    }

    if (!password) {
      return next(ApiError.badRequest("Некорректный пароль"));
    }

    const candicate = await Users.findOne({
      where: { [Op.or]: [{ email }, { login }] },
    });

    if (candicate) {
      if (candicate.login === login) {
        return next(
          ApiError.badRequest("Пользователь с таким логином уже существует")
        );
      }

      if (candicate.email === email) {
        return next(
          ApiError.badRequest("Пользователь с такой эл.почтой уже существует")
        );
      }
    }

    const hashPassword = await bcrypt.hash(password, 5);

    const user = await Users.create({ login, email, password: hashPassword });
    const token = generateJwt(user.id, user.login, user.email);
    return res.json({ token });
  }

  async login(req, res, next) {
    try {
      const { login, password } = req.body;

      if (!login || !password) {
        return next(ApiError.badRequest("Не указан логин или пароль"));
      }

      const user = await Users.findOne({ where: { login } });

      if (!user) {
        return next(ApiError.badRequest("Пользователь не найден"));
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return next(ApiError.badRequest("Неверный пароль"));
      }

      const token = generateJwt(user.id, user.login, user.email);
      return res.json({ token });
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.login, req.user.email);
    return res.json({ token });
  }
}

module.exports = new UserController();
