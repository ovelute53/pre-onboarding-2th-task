import { combineReducers } from 'redux';
import issueReducer from '@/redux/modules/issuesSlice';

const rootReducer = combineReducers({
  issues: issueReducer,
});

export default rootReducer;
