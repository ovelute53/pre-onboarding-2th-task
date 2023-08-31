import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIssueList, getIssueDetailItem } from '@/utils/issueUtils';

export const fetchIssueList = createAsyncThunk(
  'issues/fetchIssueList',
  async ({ page, perPage }) => {
    const response = await getIssueList(page, perPage);
    return response;
  },
);

export const fetchIssueDetail = createAsyncThunk('issues/fetchIssueDetail', async num => {
  const response = await getIssueDetailItem(num);
  return response;
});

const issueSlice = createSlice({
  name: 'issues',
  initialState: {
    issueList: [],
    issueDetail: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchIssueList.pending, state => {
        state.loading = true;
      })
      .addCase(fetchIssueList.fulfilled, (state, action) => {
        state.loading = false;
        state.issueList = action.payload;
      })
      .addCase(fetchIssueList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchIssueDetail.pending, state => {
        state.loading = true;
      })
      .addCase(fetchIssueDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.issueDetail = action.payload;
      })
      .addCase(fetchIssueDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default issueSlice.reducer;
