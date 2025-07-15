import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { fetchPostsAsync, addPostAsync, editPostAsync, removePostAsync } from './postsSlice';
import PostForm from '../../components/PostForm';
import PostItem from '../../components/PostItem';
import { Post, NewPost } from './postsAPI';

const Posts: React.FC = () => {
  const dispatch = useAppDispatch();
  const { posts, status, error } = useAppSelector((state) => state.posts);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    dispatch(fetchPostsAsync());
  }, [dispatch]);

  const handleAddPost = async (post: NewPost) => {
    await dispatch(addPostAsync(post));
    setShowAddForm(false);
  };

  const handleUpdatePost = async (post: Post) => {
    await dispatch(editPostAsync(post));
    setEditingPost(null);
  };

  const handleFormSubmit = (post: Post | NewPost) => {
    if ('id' in post) {
      handleUpdatePost(post);
    } else {
      handleAddPost(post);
    }
  };

  const handleDeletePost = async (id: number) => {
    await dispatch(removePostAsync(id));
  };

  if (status === 'loading' && posts.length === 0) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Менеджер постов</h1>
      
      {!showAddForm && !editingPost && (
        <button 
          onClick={() => setShowAddForm(true)} 
          className="btn btn-primary mb-3"
        >
          Добавить пост
        </button>
      )}

      {showAddForm && (
        <div className="mb-4">
          <h2>Новый пост</h2>
          <PostForm 
            onSubmit={handleFormSubmit} 
            onCancel={() => setShowAddForm(false)} 
          />
        </div>
      )}

      {editingPost && (
        <div className="mb-4">
          <h2>Редактировать пост</h2>
          <PostForm 
            post={editingPost} 
            onSubmit={handleFormSubmit} 
            onCancel={() => setEditingPost(null)} 
          />
        </div>
      )}

      <div className="posts-list">
        {posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            onEdit={setEditingPost}
            onDelete={handleDeletePost}
          />
        ))}
      </div>
    </div>
  );
};

export default Posts;