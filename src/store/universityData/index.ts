import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { STATUSES } from 'constants/redux';
import getUniversityData from './action';
import { UniversityData } from './type';

const initialState: UniversityData = {
  status: STATUSES.INITIAL,
  data: [],
};

const isPendingAction = (action: Action) => action.type.startsWith('university') && action.type.endsWith('pending');

const isRejectionAction = (action: Action) => action.type.startsWith('university') && action.type.endsWith('rejected');

const setData = (state: UniversityData, universityList: IUniversity[]) => {
  state.data = universityList;
};

const resetData = (state: UniversityData) => {
  state.data = [];
};

export const UniversitySlice = createSlice({
  name: 'university',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUniversityData.fulfilled.type, (state: UniversityData, action: PayloadAction<IUniversity[]>) => {
        state.status = STATUSES.FULFILLED;
        setData(state, action.payload);
      })
      .addMatcher(isPendingAction, (state: UniversityData) => {
        state.status = STATUSES.PENDING;
      })
      .addMatcher(isRejectionAction, (state: UniversityData) => {
        state.status = STATUSES.REJECTED;
        resetData(state);
      });
  },
});

export { getUniversityData };

export default UniversitySlice.reducer;
