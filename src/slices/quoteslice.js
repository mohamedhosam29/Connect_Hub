import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRandomQuote } from "../services/quoteservice";

export const getRandomQuote = createAsyncThunk(
  "quotes/getRandomQuote",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchRandomQuote();
      return res.data;
    } catch (err) {
      return rejectWithValue("Unable to load quote. Please try again.");
    }
  }
);

const quoteSlice = createSlice({
  name: "quotes",
  initialState: {
    currentQuote: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRandomQuote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRandomQuote.fulfilled, (state, action) => {
        state.loading = false;
        state.currentQuote = action.payload;
      })
      .addCase(getRandomQuote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default quoteSlice.reducer;