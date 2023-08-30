// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '@/redux/reducers/index'; // 루트 리듀서를 가져옵니다.

const store = configureStore({
  reducer: rootReducer,
});

export default store;
