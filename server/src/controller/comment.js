import Comment from "../model/comment";
import Post from "../model/post";
import { commentSchema } from "../schema/comment";

export const getAll = async (req, res) => {
  try {
    const {
      _page = 1,
      _limit,
      _order = "asc",
      _sort = "createdAt",
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

    const comments = await Comment.paginate(
      {},
      { ...options, populate: [{ path: "userId" }, { path: "postId" }] }
    );

    if (!comments) {
      return res.status(404).json({
        error: "No comments found",
      });
    }

    return res.status(200).json({
      message: "get all comments successfully",
      data: comments.docs,
      pagiation: {
        currentPage: comments.page,
        totalPages: comments.totalPages,
        totalItem: comments.totalDocs,
      },
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

export const fetchByPostId = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await Comment.find({ postId: id }).populate('userId')

    if(!comments) {
        return res.status(404).json({
            error: "No comments found",
        })
    }

    return res.status(200).json({
        message: "Comment by post id: " + id,
        comments
    })
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

export const create = async (req, res) => {
  try {
    const { error } = commentSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map(({ message }) => message);
      return res.status(400).json({
        error: errors,
      });
    }

    const comment = await Comment.create(req.body);

    await Post.findByIdAndUpdate(req.body.postId, {
      $addToSet: {
        comments: comment._id,
      },
    });

    if (!comment) {
      return res.status(404).json({
        error: "Create comment failed",
      });
    }
    return res.status(200).json({
      message: "Create post successfully",
      comment,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

export const removeComment = async (req, res) => {
  try {
    const { id } = req.params

    const comment = await Comment.findOne({ _id: id })

    if(!comment) {
      return res.status(404).json({
        error: "Comment not found",
      })
    }

    await Post.updateOne({ _id: comment.postId }, {
      $pull: { comments: id }
    })

    await Comment.findByIdAndDelete({ _id: id })

    return res.status(204).json({
      message: "Comment deleted",
    })
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
}
