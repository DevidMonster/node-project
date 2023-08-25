import Comment from "../model/comment";
import Post from "../model/post";
import { postSchema } from "../schema/post";
import slug from "slug";

export const getAll = async (req, res) => {
  try {
    const {
      _page = 1,
      _limit,
      _sort = "createdAt",
      _order = "asc",
      _expand,
      _q = "",
    } = req.query;
    const options = {
      page: _page,
      sort: {
        [_sort]: _order == "asc" ? "asc" : "desc",
      },
      collation: { locale: 'vi', strength: 1 },
    };

    if (_limit !== undefined) {
      options.limit = _limit;
    }
    const populated = _expand !== undefined ? [{ path: "userId" }] : [];

    const posts = await Post.paginate(
      { title: { $regex: _q, $options: "i" } },
      { ...options, populate: populated }
    );
    console.log(_q);

    if (!posts) {
      return res.status(404).json({
        error: "no posts found",
      });
    }

    return res.status(200).json({
      message: "get posts successfully",
      data: posts.docs,
      pagination: {
        currentPage: posts.page,
        totalPage: posts.totalPages,
        totalItem: posts.totalDocs,
      },
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getOne = async (req, res) => {
  try {
    const { slug, id } = req.params;
    console.log(id);
    let post;
    if (id) {
      post = await Post.findById(id).populate("comments");
    } else {
      post = await Post.findOne({ slug: slug }).populate("comments");
    }
    if (!post) {
      return res.status(404).json({
        error: "no post not found",
      });
    }

    return res.status(200).json({
      message: "post found",
      post,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const create = async (req, res) => {
  try {
    console.log(req.body);
    const { error } = postSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map(({ message }) => message);
      return res.status(400).json({
        error: errors,
      });
    }

    const post = await Post.create(req.body);

    if (!post) {
      return res.status(404).json({
        error: "Create post failed",
      });
    }

    return res.status(200).json({
      message: "Create post successfully",
      post,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const patchPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = postSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map(({ message }) => message);
      return res.status(400).json({
        message: errors,
      });
    }
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        message: "Id not found",
      });
    }

    const postUpdated = await Post.findByIdAndUpdate(id, req.body);

    return res.status(200).json({
      message: "Updated successfully",
      post: postUpdated,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//force Delete
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findOneDeleted({ _id: id });

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    await Comment.deleteMany({ postId: id });

    await Post.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Post deleted successfully",
      post,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//item have been deleted
export const trash = async (req, res) => {
  try {
    const posts = await Post.findDeleted({});

    if (!posts) {
      return res.status(404).json({
        message: "No posts deleted found",
      });
    }

    const postsDeleted = posts.filter((post) => post.deleted === true);

    return res.status(200).json({
      message: "Success",
      posts: postsDeleted,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const restorePost = async (req, res) => {
  try {
    const { id } = req.params;

    await Post.restore({ _id: id });

    return res.status(200).json({
      message: "Post restored successfully",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const removePost = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id: ", id);
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        error: "Post not found",
      });
    }

    await Post.delete({ _id: id });

    return res.status(200).json({
      message: "Post deleted successfully",
      post,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
