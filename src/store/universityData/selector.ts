import type { RootState } from 'store';

// Other code such as selectors can use the imported `RootState` type
export const selectUniversity = (state: RootState) => state.university.data;
export const universityActionState = (state: RootState) => state.university.status;
