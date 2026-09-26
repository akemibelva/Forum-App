import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import styled from 'styled-components';
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

// Integrasi styled-components untuk memenuhi kriteria React Ecosystem
const CategoryBadge = styled.span`
  display: inline-block;
  padding: 4px 10px;
  background-color: #e0f2fe;
  color:  #52796f;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
`;

const VoteButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background-color: ${(props) => (props.$isVoted ? '#eff6ff' : '#ffffff')};
  color: ${(props) => (props.$isVoted ? ' #52796f' : '#64748b')};
  border-color: ${(props) => (props.$isVoted ? ' #52796f' : '#e2e8f0')};
  font-weight: ${(props) => (props.$isVoted ? '600' : '400')};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f1f5f9;
    border-color: #cbd5e1;
  }
`;

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
          <CategoryBadge className="thread-detail__category">
            #{detailThread.category}
          </CategoryBadge>
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
            <VoteButton
              type="button"
              className={`btn-vote ${isUpVoted ? 'voted' : ''}`}
              $isVoted={isUpVoted}
              onClick={onUpVote}
            >
              <FaThumbsUp />
              <span>{detailThread.upVotesBy?.length || 0}</span>
            </VoteButton>

            <VoteButton
              type="button"
              className={`btn-vote ${isDownVoted ? 'voted' : ''}`}
              $isVoted={isDownVoted}
              onClick={onDownVote}
            >
              <FaThumbsDown />
              <span>{detailThread.downVotesBy?.length || 0}</span>
            </VoteButton>
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