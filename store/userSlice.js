import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      notPresent: () => {
        state.user = null ;
      },
      present: (state, { payload }) => {
        state.user = payload ;
      }
    },
});

export const { notPresent, present } = userSlice.actions;

export default userSlice.reducer;




