import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUser, fetchAllUsers, fetchUserPosts } from "../services/userservice";

export const getUserProfile = createAsyncThunk(
  "users/getUserProfile",
  async ({ userId, currentUserId }, { rejectWithValue }) => {
    try {
      if (Number(userId) === currentUserId) {
        return { user: null, posts: [], isOwnProfile: true };
      }

      const userRes = await fetchUser(userId);
      const postsRes = await fetchUserPosts(userId);
      return { user: userRes.data, posts: postsRes.data, isOwnProfile: false };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchAllUsers();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const getFollowMap = () => {
  const saved = localStorage.getItem("followMap");
  return saved ? JSON.parse(saved) : {};
};

const saveFollowMap = (map) => {
  localStorage.setItem("followMap", JSON.stringify(map));
};

const usersSlice = createSlice({
  name: "users",
  initialState: {
    profileUser: null,
    profilePosts: [],
    allUsers: [],
    followMap: getFollowMap(),
    isOwnProfile: false,
    loading: false,
    error: null,
  },
  reducers: {
    toggleFollow: (state, action) => {
      const targetId = action.payload;
      state.followMap[targetId] = !state.followMap[targetId];
      saveFollowMap(state.followMap);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profileUser = action.payload.user;
        state.profilePosts = action.payload.posts;
        state.isOwnProfile = action.payload.isOwnProfile;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload;
      });
  },
});

export const { toggleFollow } = usersSlice.actions;
export default usersSlice.reducer;