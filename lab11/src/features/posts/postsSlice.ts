import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post, NewPost, fetchPosts, createPost, updatePost, deletePost } from './postsAPI';

interface PostsState {
  posts: Post[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  status: 'idle',
  error: null,
};

export const fetchPostsAsync = createAsyncThunk('posts/fetchPosts', async () => {
  return await fetchPosts();
});

export const addPostAsync = createAsyncThunk('posts/addPost', async (post: NewPost) => {
  return await createPost(post);
});

export const editPostAsync = createAsyncThunk('posts/editPost', async (post: Post) => {
  return await updatePost(post);
});

export const removePostAsync = createAsyncThunk('posts/removePost', async (id: number) => {
  await deletePost(id);
  return id;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPostsAsync.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.status = 'idle';
        state.posts = action.payload;
      })
      .addCase(fetchPostsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch posts';
      })
      .addCase(addPostAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addPostAsync.fulfilled, (state, action: PayloadAction<Post>) => {
        state.status = 'idle';
        state.posts.unshift(action.payload);
      })
      .addCase(addPostAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to add post';
      })
      .addCase(editPostAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editPostAsync.fulfilled, (state, action: PayloadAction<Post>) => {
        state.status = 'idle';
        const index = state.posts.findIndex(post => post.id === action.payload.id);
        if (index !== -1) {
            state.posts[index] = action.payload;
        }
    })
      .addCase(editPostAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to edit post';
      })
      .addCase(removePostAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removePostAsync.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = 'idle';
        state.posts = state.posts.filter(post => post.id !== action.payload);
      })
      .addCase(removePostAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to delete post';
      });
  },
});

export default postsSlice.reducer;