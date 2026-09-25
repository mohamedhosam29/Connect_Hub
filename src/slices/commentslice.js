import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchComments, createComment, deleteComment } from "../services/commentservice";

const getSavedComments = () => {
  const saved = localStorage.getItem("localComments");
  return saved ? JSON.parse(saved) : [];
};

const saveLocalComments = (comments) => {
  localStorage.setItem("localComments", JSON.stringify(comments));
};

export const getComments = createAsyncThunk(
  "comments/getComments",
  async (postId, { rejectWithValue }) => {
    try {
      const res = await fetchComments(postId);
      const localComments = getSavedComments().filter((c) => c.postId === Number(postId));
      return [...res.data, ...localComments];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addComment = createAsyncThunk(
  "comments/addComment",
  async (commentData, { rejectWithValue }) => {
    try {
      const res = await createComment(commentData);
      const newComment = { ...res.data, id: Date.now() };

      const localComments = getSavedComments();
      localComments.push(newComment);
      saveLocalComments(localComments);

      return newComment;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const removeComment = createAsyncThunk(
  "comments/removeComment",
  async (commentId, { rejectWithValue }) => {
    try {
      if (commentId <= 500) {
        await deleteComment(commentId);
      }

      let localComments = getSavedComments();
      localComments = localComments.filter((c) => c.id !== commentId);
      saveLocalComments(localComments);

      return commentId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter((c) => c.id !== action.payload);
      });
  },
});

export default commentsSlice.reducer;