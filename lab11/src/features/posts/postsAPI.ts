import axios from 'axios';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId?: number;
}

export interface NewPost {
  title: string;
  body: string;
  userId?: number;
}

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createPost = async (post: NewPost): Promise<Post> => {
  const response = await axios.post(API_URL, post);
  return response.data;
};

export const updatePost = async (post: Post): Promise<Post> => {
  try {
    const response = await axios.put(`${API_URL}/${post.id}`, {
      id: post.id,         
      title: post.title,   
      body: post.body,     
      userId: post.userId || 1  // ID пользователя (обязательное поле для JSONPlaceholder)
    });
    
    // Возвращаем обновлённый пост с сервера
    return response.data;
    
  } catch (error) {
    console.error('Error updating post:', error);
    return post;
  }
};

export const deletePost = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};