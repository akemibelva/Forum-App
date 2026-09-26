import { ActionType } from './action';

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREADS:
    return action.payload.threads;

  case ActionType.ADD_THREAD:
    return [action.payload.thread, ...threads];

  case ActionType.TOGGLE_UP_VOTE_THREAD: {
    const { threadId, userId } = action.payload;

    return threads.map((thread) => {
      if (thread.id !== threadId) {
        return thread;
      }

      const isUpVoted = thread.upVotesBy.includes(userId);

      return {
        ...thread,
        upVotesBy: isUpVoted
          ? thread.upVotesBy.filter((id) => id !== userId)
          : [...thread.upVotesBy, userId],
        // Hapus dari downVotesBy jika beralih ke up-vote
        downVotesBy: thread.downVotesBy.filter((id) => id !== userId),
      };
    });
  }

  case ActionType.TOGGLE_DOWN_VOTE_THREAD: {
    const { threadId, userId } = action.payload;

    return threads.map((thread) => {
      if (thread.id !== threadId) {
        return thread;
      }

      const isDownVoted = thread.downVotesBy.includes(userId);

      return {
        ...thread,
        downVotesBy: isDownVoted
          ? thread.downVotesBy.filter((id) => id !== userId)
          : [...thread.downVotesBy, userId],
        // Hapus dari upVotesBy jika beralih ke down-vote
        upVotesBy: thread.upVotesBy.filter((id) => id !== userId),
      };
    });
  }

  default:
    return threads;
  }
}

export default threadsReducer;