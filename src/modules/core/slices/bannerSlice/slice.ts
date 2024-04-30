import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type BannerStateType = {
  bannerImage: string;
};

const initialState: BannerStateType = {
  bannerImage: '',
};

export const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    setBannerImage: (state, action: PayloadAction<Pick<BannerStateType, 'bannerImage'>>) => {
      state.bannerImage = action.payload.bannerImage;
    },
    resetBanner: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const bannerActions = bannerSlice.actions;

export default bannerSlice;
