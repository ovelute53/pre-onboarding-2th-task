import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api";

export const fetchIssues = createAsyncThunk(
  "issues/fetchIssues",
  async (page = 1) => {
    const response = await api.get(
      `/repos/facebook/react/issues?state=open&page=${page}`,
    );
    return response.data;
  },
);

export const fetchIssueDetail = createAsyncThunk(
  "issues/fetchIssueDetail",
  async (issueNumber) => {
    const response = await api.get(
      `/repos/facebook/react/issues/${issueNumber}`,
    );
    return response.data;
  },
);

const issuesSlice = createSlice({
  name: "issues",
  initialState: {
    list: [],
    currentIssue: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchIssues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchIssueDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIssueDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.currentIssue = action.payload;
      })
      .addCase(fetchIssueDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default issuesSlice.reducer;
