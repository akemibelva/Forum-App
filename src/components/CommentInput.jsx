import React from 'react';
import useInput from '../utils/useInput';

function CommentInput({ onAddComment }) {
  const [content, onContentChange, setContent] = useInput('');

  const onSubmit = (event) => {
    event.preventDefault();
    if (!content.trim()) return;

    onAddComment(content);
    setContent('');
  };

  return (
    <form onSubmit={onSubmit} className="comment-input">
      <h3>Beri Komentar</h3>
      <textarea
        rows="4"
        value={content}
        onChange={onContentChange}
        placeholder="Tulis tanggapanmu..."
        required
      />
      <button type="submit" className="btn-primary">
        Kirim Komentar
      </button>
    </form>
  );
}

export default CommentInput;