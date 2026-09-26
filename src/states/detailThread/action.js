import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_DETAIL_THREAD: 'RECEIVE_DETAIL_THREAD',
  CLEAR_DETAIL_THREAD: 'CLEAR_DETAIL_THREAD',
  ADD_COMMENT: 'ADD_COMMENT',
  TOGGLE_UP_VOTE_DETAIL_THREAD: 'TOGGLE_UP_VOTE_DETAIL_THREAD',
  TOGGLE_DOWN_VOTE_DETAIL_THREAD: 'TOGGLE_DOWN_VOTE_DETAIL_THREAD',
  TOGGLE_UP_VOTE_COMMENT: 'TOGGLE_UP_VOTE_COMMENT',
  TOGGLE_DOWN_VOTE_COMMENT: 'TOGGLE_DOWN_VOTE_COMMENT',
};

function receiveDetailThreadActionCreator(detailThread) {
  return {
    type: ActionType.RECEIVE_DETAIL_THREAD,
    payload: {
      detailThread,
    },
  };
}

function clearDetailThreadActionCreator() {
  return {
    type: ActionType.CLEAR_DETAIL_THREAD,
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function toggleUpVoteDetailThreadActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_DETAIL_THREAD,
    payload: {
      userId,
    },
  };
}

function toggleDownVoteDetailThreadActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_DETAIL_THREAD,
    payload: {
      userId,
    },
  };
}

function toggleUpVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function toggleDownVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function asyncReceiveDetailThread(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearDetailThreadActionCreator());
    try {
      const detailThread = await api.getThreadDetail(threadId);
      dispatch(receiveDetailThreadActionCreator(detailThread));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(addCommentActionCreator(comment));
      return true;
    } catch (error) {
      alert(error.message);
      return false;
    } finally {
      dispatch(hideLoading());
    }
  };
}

// Thunk Up-Vote Detail Thread (Optimistic Update)
function asyncToggleVoteDetailThread() {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState();

    if (!authUser) {
      alert('Anda harus login terlebih dahulu untuk melakukan vote!');
      return;
    }

    const userId = authUser.id;
    const isUpVoted = detailThread.upVotesBy.includes(userId);

    dispatch(toggleUpVoteDetailThreadActionCreator(userId));
    dispatch(showLoading());

    try {
      if (isUpVoted) {
        await api.neutralVoteThread(detailThread.id);
      } else {
        await api.upVoteThread(detailThread.id);
      }
    } catch (error) {
      alert(error.message);
      dispatch(toggleUpVoteDetailThreadActionCreator(userId));
    } finally {
      dispatch(hideLoading());
    }
  };
}

// Thunk Down-Vote Detail Thread (Optimistic Update)
function asyncToggleDownVoteDetailThread() {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState();

    if (!authUser) {
      alert('Anda harus login terlebih dahulu untuk melakukan vote!');
      return;
    }

    const userId = authUser.id;
    const isDownVoted = detailThread.downVotesBy.includes(userId);

    dispatch(toggleDownVoteDetailThreadActionCreator(userId));
    dispatch(showLoading());

    try {
      if (isDownVoted) {
        await api.neutralVoteThread(detailThread.id);
      } else {
        await api.downVoteThread(detailThread.id);
      }
    } catch (error) {
      alert(error.message);
      dispatch(toggleDownVoteDetailThreadActionCreator(userId));
    } finally {
      dispatch(hideLoading());
    }
  };
}

// Thunk Up-Vote Comment (Optimistic Update)
function asyncToggleUpVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState();

    if (!authUser) {
      alert('Anda harus login terlebih dahulu untuk melakukan vote!');
      return;
    }

    const userId = authUser.id;
    const comment = detailThread.comments.find((c) => c.id === commentId);
    const isUpVoted = comment.upVotesBy.includes(userId);

    dispatch(toggleUpVoteCommentActionCreator({ commentId, userId }));
    dispatch(showLoading());

    try {
      if (isUpVoted) {
        await api.neutralVoteComment({ threadId: detailThread.id, commentId });
      } else {
        await api.upVoteComment({ threadId: detailThread.id, commentId });
      }
    } catch (error) {
      alert(error.message);
      dispatch(toggleUpVoteCommentActionCreator({ commentId, userId }));
    } finally {
      dispatch(hideLoading());
    }
  };
}

// Thunk Down-Vote Comment (Optimistic Update)
function asyncToggleDownVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState();

    if (!authUser) {
      alert('Anda harus login terlebih dahulu untuk melakukan vote!');
      return;
    }

    const userId = authUser.id;
    const comment = detailThread.comments.find((c) => c.id === commentId);
    const isDownVoted = comment.downVotesBy.includes(userId);

    dispatch(toggleDownVoteCommentActionCreator({ commentId, userId }));
    dispatch(showLoading());

    try {
      if (isDownVoted) {
        await api.neutralVoteComment({ threadId: detailThread.id, commentId });
      } else {
        await api.downVoteComment({ threadId: detailThread.id, commentId });
      }
    } catch (error) {
      alert(error.message);
      dispatch(toggleDownVoteCommentActionCreator({ commentId, userId }));
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  receiveDetailThreadActionCreator,
  clearDetailThreadActionCreator,
  addCommentActionCreator,
  toggleUpVoteDetailThreadActionCreator,
  toggleDownVoteDetailThreadActionCreator,
  toggleUpVoteCommentActionCreator,
  toggleDownVoteCommentActionCreator,
  asyncReceiveDetailThread,
  asyncAddComment,
  asyncToggleVoteDetailThread,
  asyncToggleDownVoteDetailThread,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
};