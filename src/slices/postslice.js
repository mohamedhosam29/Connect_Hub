import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPosts, createPost, updatePost, deletePost } from "../services/postservice";
import { fetchAllComments } from "../services/commentservice";

const getSavedPosts = () => {
  const saved = localStorage.getItem("posts");
  return saved ? JSON.parse(saved) : [];
};

const savePosts = (posts) => {
  localStorage.setItem("posts", JSON.stringify(posts));
};

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, { rejectWithValue }) => {
    try {
      const postsRes = await fetchPosts();
      const commentsRes = await fetchAllComments();

      const localComments = JSON.parse(localStorage.getItem("localComments")) || [];
      const allComments = [...commentsRes.data, ...localComments];

      const countMap = {};
      allComments.forEach((c) => {
        countMap[c.postId] = (countMap[c.postId] || 0) + 1;
      });

      const postsWithCounts = postsRes.data.map((post) => ({
        ...post,
        commentCount: countMap[post.id] || 0,
      }));

      return postsWithCounts;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (postData, { rejectWithValue }) => {
    try {
      const res = await createPost(postData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const editPost = createAsyncThunk(
  "posts/editPost",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      if (id <= 100) {
        await updatePost(id, data);
      }
      return { id, data };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const removePost = createAsyncThunk(
  "posts/removePost",
  async (postId, { rejectWithValue }) => {
    try {
      await deletePost(postId);
      return postId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: getSavedPosts(),
    selectedPost: null,
    loading: false,
    error: null,
  },
  reducers: {
    toggleLike: (state, action) => {
      const post = state.posts.find((p) => p.id === action.payload);
      if (post) {
        post.liked = !post.liked;
        post.likeCount = post.liked
          ? (post.likeCount || 0) + 1
          : (post.likeCount || 1) - 1;
      }
      savePosts(state.posts);
    },
    setSelectedPost: (state, action) => {
      state.selectedPost = state.posts.find((p) => p.id === action.payload) || null;
    },
    clearSelectedPost: (state) => {
      state.selectedPost = null;
    },
    incrementCommentCount: (state, action) => {
    const post = state.posts.find((p) => p.id === action.payload);
    if (post) {
      post.commentCount = (post.commentCount || 0) + 1;
    }
    savePosts(state.posts);
  },
  decrementCommentCount: (state, action) => {
    const post = state.posts.find((p) => p.id === action.payload);
    if (post) {
      post.commentCount = (post.commentCount || 1) - 1;
    }
    savePosts(state.posts);
  },
},

  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        if (state.posts.length === 0) {
          state.posts = action.payload.map((post) => ({
            ...post,
            likeCount: Math.floor(Math.random() * 20),
            liked: false,
            createdAt: new Date().toLocaleString(),
          }));
          savePosts(state.posts);
        }
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.unshift({
          ...action.payload,
          likeCount: 0,
          liked: false,
          commentCount: 0,
          createdAt: new Date().toLocaleString(),
        });
        savePosts(state.posts);
      })
      .addCase(editPost.fulfilled, (state, action) => {
        const post = state.posts.find((p) => p.id === action.payload.id);
        if (post) {
          post.body = action.payload.data.body;
          post.image = action.payload.data.image;
        }
        savePosts(state.posts);
      })
      .addCase(removePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((p) => p.id !== action.payload);
        savePosts(state.posts);
      });
  },
});

export const { toggleLike, setSelectedPost, clearSelectedPost, incrementCommentCount, decrementCommentCount } = postsSlice.actions;
export default postsSlice.reducer;