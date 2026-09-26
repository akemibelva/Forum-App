import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { postedAt } from '../utils';

function CommentItem({
  id,
  content,
  createdAt,
  owner,
  upVotesBy = [],
  downVotesBy = [],
  authUser,
  onUpVoteComment,
  onDownVoteComment,
}) {
  const isUpVoted = authUser && upVotesBy.includes(authUser.id);
  const isDownVoted = authUser && downVotesBy.includes(authUser.id);

  return (
    <div className="comment-item">
      <header className="comment-item__header">
        <div className="comment-item__owner">
          <img src={owner?.avatar} alt={owner?.name} className="comment-item__avatar" />
          <span className="comment-item__name">{owner?.name}</span>
        </div>
        <span className="comment-item__posted">{postedAt(createdAt)}</span>
      </header>
      <div
        className="comment-item__body"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <footer className="comment-item__footer" style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
        <button
          type="button"
          className={`btn-vote ${isUpVoted ? 'voted' : ''}`}
          onClick={() => onUpVoteComment(id)}
        >
          <FaThumbsUp />
          <span>{upVotesBy.length}</span>
        </button>

        <button
          type="button"
          className={`btn-vote ${isDownVoted ? 'voted' : ''}`}
          onClick={() => onDownVoteComment(id)}
        >
          <FaThumbsDown />
          <span>{downVotesBy.length}</span>
        </button>
      </footer>
    </div>
  );
}

function CommentList({
  comments = [],
  authUser,
  onUpVoteComment,
  onDownVoteComment,
}) {
  return (
    <div className="comments-list">
      <h3>Komentar ({comments.length})</h3>
      {comments.length === 0 ? (
        <p className="empty-comments">Belum ada komentar.</p>
      ) : (
        comments.map((comment) => (
          <CommentItem
            key={comment.id}
            {...comment}
            authUser={authUser}
            onUpVoteComment={onUpVoteComment}
            onDownVoteComment={onDownVoteComment}
          />
        ))
      )}
    </div>
  );
}

export default CommentList;