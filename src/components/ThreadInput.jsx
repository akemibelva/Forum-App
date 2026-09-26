import React from 'react';
import useInput from '../utils/useInput';

function ThreadInput({ onAddThread, onClose }) {
  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, onBodyChange] = useInput('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim() || !body.trim()) return;

    onAddThread({ title, category, body });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Buat Diskusi Baru</h3>
          <button type="button" className="btn-close" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="thread-input-form">
          <div className="form-group">
            <label htmlFor="thread-title">Judul</label>
            <input
              id="thread-title"
              type="text"
              placeholder="Judul thread..."
              value={title}
              onChange={onTitleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="thread-category">Kategori</label>
            <input
              id="thread-category"
              type="text"
              placeholder="contoh: redux, react (opsional)"
              value={category}
              onChange={onCategoryChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="thread-body">Isi Diskusi</label>
            <textarea
              id="thread-body"
              rows="6"
              placeholder="Apa yang ingin kamu diskusikan?"
              value={body}
              onChange={onBodyChange}
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="btn-primary">
              Kirim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ThreadInput;