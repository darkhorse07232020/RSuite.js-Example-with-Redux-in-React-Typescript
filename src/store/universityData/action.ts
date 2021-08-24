import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getUniversityData = createAsyncThunk('university/get', async (params: IUniversityAPIParams) => {
  const response = await axios.get('http://universities.hipolabs.com/search', {
    params,
  });
  return response.data;
});

export default getUniversityData;
