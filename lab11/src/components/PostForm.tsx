import React, { useState } from 'react';
import { Post, NewPost } from '../features/posts/postsAPI';

interface PostFormProps {
  post?: Post;
  onSubmit: (post: Post | NewPost) => void;
  onCancel?: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ post, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(post?.title || '');
  const [body, setBody] = useState(post?.body || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = { title, body };
    
    if (post) {
      onSubmit({ ...post, ...formData });
    } else {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Заголовок</label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="body" className="form-label">Содержание</label>
        <textarea
          className="form-control"
          id="body"
          rows={3}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary me-2">
        {post ? 'Обновить' : 'Добавить'} пост
      </button>
      {onCancel && (
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Отмена
        </button>
      )}
    </form>
  );
};

export default PostForm;