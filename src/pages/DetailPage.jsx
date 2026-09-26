import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import CommentInput from '../components/CommentInput';
import CommentList from '../components/CommentList';
import { postedAt } from '../utils';
import {
  asyncReceiveDetailThread,
  asyncAddComment,
  asyncToggleVoteDetailThread,
  asyncToggleDownVoteDetailThread,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
} from '../states/detailThread/action';

function DetailPage() {
  const { id } = useParams();
  const detailThread = useSelector((state) => state.detailThread);
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveDetailThread(id));
  }, [id, dispatch]);

  const onAddComment = (content) => {
    dispatch(asyncAddComment({ threadId: id, content }));
  };

  const onUpVote = () => {
    dispatch(asyncToggleVoteDetailThread());
  };

  const onDownVote = () => {
    dispatch(asyncToggleDownVoteDetailThread());
  };

  const onUpVoteComment = (commentId) => {
    dispatch(asyncToggleUpVoteComment(commentId));
  };

  const onDownVoteComment = (commentId) => {
    dispatch(asyncToggleDownVoteComment(commentId));
  };

  if (!detailThread) {
    return null;
  }

  const isUpVoted = authUser && detailThread.upVotesBy?.includes(authUser.id);
  const isDownVoted = authUser && detailThread.downVotesBy?.includes(authUser.id);

  return (
    <section className="detail-page">
      <article className="thread-detail">
        {detailThread.category && (
          <span className="thread-detail__category">#{detailThread.category}</span>
        )}
        <h2 className="thread-detail__title">{detailThread.title}</h2>
        <div
          className="thread-detail__body"
          dangerouslySetInnerHTML={{ __html: detailThread.body }}
        />

        <footer className="thread-detail__footer">
          <div className="thread-detail__author-info">
            <img
              src={detailThread.owner?.avatar}
              alt={detailThread.owner?.name}
              className="thread-detail__avatar"
            />
            <span className="thread-detail__author">
              Dibuat oleh <strong>{detailThread.owner?.name}</strong>
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              type="button"
              className={`btn-vote ${isUpVoted ? 'voted' : ''}`}
              onClick={onUpVote}
            >
              <FaThumbsUp />
              <span>{detailThread.upVotesBy?.length || 0}</span>
            </button>

            <button
              type="button"
              className={`btn-vote ${isDownVoted ? 'voted' : ''}`}
              onClick={onDownVote}
            >
              <FaThumbsDown />
              <span>{detailThread.downVotesBy?.length || 0}</span>
            </button>
          </div>

          <span className="thread-detail__posted">{postedAt(detailThread.createdAt)}</span>
        </footer>
      </article>

      <div className="thread-comment-section">
        {authUser ? (
          <CommentInput onAddComment={onAddComment} />
        ) : (
          <p className="login-prompt">
            <Link to="/login">Masuk</Link> untuk memberi komentar.
          </p>
        )}
        <CommentList
          comments={detailThread.comments}
          authUser={authUser}
          onUpVoteComment={onUpVoteComment}
          onDownVoteComment={onDownVoteComment}
        />
      </div>
    </section>
  );
}

export default DetailPage;