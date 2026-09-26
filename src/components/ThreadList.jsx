import React from 'react';
import ThreadItem from './ThreadItem';

function ThreadList({ threads = [], users = [], authUser, onUpVote, onDownVote }) {
  if (threads.length === 0) {
    return <p className="threads-empty">Tidak ada diskusi ditemukan.</p>;
  }

  return (
    <div className="threads-list">
      {threads.map((thread) => {
        const owner = users.find((user) => user.id === thread.ownerId);

        return (
          <ThreadItem
            key={thread.id}
            {...thread}
            user={owner}
            authUser={authUser}
            onUpVote={onUpVote}
            onDownVote={onDownVote}
          />
        );
      })}
    </div>
  );
}

export default ThreadList;