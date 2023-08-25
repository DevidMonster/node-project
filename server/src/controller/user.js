import User from "../model/user";
import { singupSchema, userSchema } from "../schema/auth";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res) => {
  try {
    const {
      _page = 1,
      _limit,
      _sort = "createdAt",
      _order = "asc",
    } = req.query;
    const options = {
      page: _page,
      sort: {
        [_sort]: _order == "asc" ? "asc" : "desc",
      },
    };

    if (_limit !== undefined) {
      options.limit = _limit;
    }
    const users = await User.paginate({}, { ...options });

    if (!users) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    return res.status(200).json({
      message: "Get users successfully",
      users: users.docs,
      pagination: {
        currentPage: users.page,
        totalPage: users.totalPages,
        totalItem: users.totalDocs,
      },
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const fetchOne = async (req, res) => {
    try {
        const { id } = req.params

        const user = await User.findById(id)

        if(!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        return res.status(200).json({
            message: 'User found',
            user
        })
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export const createUser = async (req, res) => {
  try {
    const { error } = singupSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map(({ message }) => message);
      return res.status(401).json({
        error: errors,
      });
    }

    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(202).json({
        error: "Email already registered",
      });
    }

    const hashPassword = await bcrypt.hash(req.body.passWord, 10);

    const user = await User.create({
      ...req.body,
      passWord: hashPassword,
    });

    if (!user) {
      return res.status(401).json({
        error: "Create a new user failed",
      });
    }

    return res.status(200).json({
        message: "User created successfully",
        user
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { error } = userSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details?.map(({ message }) => message);
      return res.status(400).json({
        error: errors,
      });
    }

    const hashPassword = await bcrypt.hash(req.body.passWord, 10)

    const user = await User.findByIdAndUpdate(req.params.id, {
        ...req.body,
        passWord: hashPassword
    });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    return res.status(200).json({
      message: "User updated",
      user,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
