import { configureStore } from '@reduxjs/toolkit';

function foundationReducer(state = {}) {
  return state;
}

export const store = configureStore({
  reducer: foundationReducer,
});
