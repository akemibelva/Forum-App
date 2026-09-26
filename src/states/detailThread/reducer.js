import { ActionType } from './action';

function detailThreadReducer(detailThread = null, action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_DETAIL_THREAD:
    return action.payload.detailThread;

  case ActionType.CLEAR_DETAIL_THREAD:
    return null;

  case ActionType.ADD_COMMENT:
    return {
      ...detailThread,
      comments: [action.payload.comment, ...detailThread.comments],
    };

  case ActionType.TOGGLE_UP_VOTE_DETAIL_THREAD: {
    const { userId } = action.payload;
    const isUpVoted = detailThread.upVotesBy.includes(userId);

    return {
      ...detailThread,
      upVotesBy: isUpVoted
        ? detailThread.upVotesBy.filter((id) => id !== userId)
        : [...detailThread.upVotesBy, userId],
      downVotesBy: detailThread.downVotesBy.filter((id) => id !== userId),
    };
  }

  case ActionType.TOGGLE_DOWN_VOTE_DETAIL_THREAD: {
    const { userId } = action.payload;
    const isDownVoted = detailThread.downVotesBy.includes(userId);

    return {
      ...detailThread,
      downVotesBy: isDownVoted
        ? detailThread.downVotesBy.filter((id) => id !== userId)
        : [...detailThread.downVotesBy, userId],
      upVotesBy: detailThread.upVotesBy.filter((id) => id !== userId),
    };
  }

  case ActionType.TOGGLE_UP_VOTE_COMMENT: {
    const { commentId, userId } = action.payload;

    return {
      ...detailThread,
      comments: detailThread.comments.map((comment) => {
        if (comment.id !== commentId) {
          return comment;
        }

        const isUpVoted = comment.upVotesBy.includes(userId);

        return {
          ...comment,
          upVotesBy: isUpVoted
            ? comment.upVotesBy.filter((id) => id !== userId)
            : [...comment.upVotesBy, userId],
          downVotesBy: comment.downVotesBy.filter((id) => id !== userId),
        };
      }),
    };
  }

  case ActionType.TOGGLE_DOWN_VOTE_COMMENT: {
    const { commentId, userId } = action.payload;

    return {
      ...detailThread,
      comments: detailThread.comments.map((comment) => {
        if (comment.id !== commentId) {
          return comment;
        }

        const isDownVoted = comment.downVotesBy.includes(userId);

        return {
          ...comment,
          downVotesBy: isDownVoted
            ? comment.downVotesBy.filter((id) => id !== userId)
            : [...comment.downVotesBy, userId],
          upVotesBy: comment.upVotesBy.filter((id) => id !== userId),
        };
      }),
    };
  }

  default:
    return detailThread;
  }
}

export default detailThreadReducer;