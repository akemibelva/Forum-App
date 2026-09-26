import { Link } from 'react-router-dom';
import { FaThumbsUp, FaThumbsDown, FaReply } from 'react-icons/fa';
import { postedAt } from '../utils';

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  upVotesBy = [],
  downVotesBy = [],
  totalComments = 0,
  user = {},
  authUser,
  onUpVote,
  onDownVote,
}) {
  const isUpVoted = authUser && upVotesBy.includes(authUser.id);
  const isDownVoted = authUser && downVotesBy.includes(authUser.id);

  const cleanBody = body ? body.replace(/<[^>]*>?/gm, '') : '';

  return (
    <article className="thread-item">
      {category && (
        <span className="thread-item__category">
          #{category}
        </span>
      )}

      <h3 className="thread-item__title">
        <Link to={`/threads/${id}`}>{title}</Link>
      </h3>

      <p className="thread-item__body">
        {cleanBody.length > 200 ? `${cleanBody.substring(0, 200)}...` : cleanBody}
      </p>

      <footer className="thread-item__footer">
        <button
          type="button"
          className={`btn-vote ${isUpVoted ? 'voted' : ''}`}
          onClick={() => onUpVote && onUpVote(id)}
        >
          <FaThumbsUp />
          <span>{upVotesBy.length}</span>
        </button>

        <button
          type="button"
          className={`btn-vote ${isDownVoted ? 'voted' : ''}`}
          onClick={() => onDownVote && onDownVote(id)}
        >
          <FaThumbsDown />
          <span>{downVotesBy.length}</span>
        </button>

        <span className="thread-item__comments">
          <FaReply />
          <span>{totalComments}</span>
        </span>

        <span className="thread-item__posted">{postedAt(createdAt)}</span>

        <span className="thread-item__author">
          Dibuat oleh <strong>{user?.name || 'Anonim'}</strong>
        </span>
      </footer>
    </article>
  );
}

export default ThreadItem;