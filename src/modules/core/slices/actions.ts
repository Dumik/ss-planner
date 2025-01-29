import { useDispatch } from 'react-redux';

import { bindActionCreators } from '@reduxjs/toolkit';

import { bannerActions } from './bannerSlice/slice';
import { manualActions } from './manualSlice/slice';

const useBannerActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(bannerActions, dispatch);
};

const useManualActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(manualActions, dispatch);
};

export { useManualActions, useBannerActions };
