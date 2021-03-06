/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable radix */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
// import { createSlice, PayloadAction } from 'redux-starter-kit';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';

export type MultipleMeasurementsTypes = {
  multipleMeasurements: string;
};

export type AllMeasurements = {
  getMetrics: [];
};

export type LiveMetricsTypes = {
  liveData: Array<Object>;
  metric: string;
  value: string;
  at: string;
  unit: string;
};

export type ApiErrorAction = {
  error: string;
};

const initialState = {
  allMetrics: [],
  multipleMeasurements: {},
  liveData: {},
};

const metricSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    allMetricsDataRecevied: (state, action: PayloadAction<AllMeasurements>) => {
      const { getMetrics } = action.payload;
      state.allMetrics = getMetrics;
    },
    metricsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const MetricsReducer = metricSlice.reducer;
export const actions = metricSlice.actions;
