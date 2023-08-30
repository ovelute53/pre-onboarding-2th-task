const initialState = {
  issues: [],
  loading: false,
  error: null,
};

const issuesReducer = (state = initialState, action) => {
  switch (action.type) {
    // 여기에 action handlers를 추가합니다.
    default:
      return state;
  }
};

export default issuesReducer;
