import React from 'react';
import { Post } from '../features/posts/postsAPI';

interface PostItemProps {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, onEdit, onDelete }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.body}</p>
        <div className="d-flex justify-content-end">
          <button 
            onClick={() => onEdit(post)} 
            className="btn btn-sm btn-outline-primary me-2"
          >
            Редактировать
          </button>
          <button 
            onClick={() => onDelete(post.id)} 
            className="btn btn-sm btn-outline-danger"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostItem;