import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type SidebarCollapse = {
  isSidebarCollapse: boolean;
};

const initialState: SidebarCollapse = {
  isSidebarCollapse: false,
};

export const manualSlice = createSlice({
  name: 'manual',
  initialState,
  reducers: {
    setSidebarCollapse: (
      state,
      action: PayloadAction<Pick<SidebarCollapse, 'isSidebarCollapse'>>,
    ) => {
      state.isSidebarCollapse = action.payload.isSidebarCollapse;
    },
  },
});

export const manualActions = manualSlice.actions;

export default manualSlice;
