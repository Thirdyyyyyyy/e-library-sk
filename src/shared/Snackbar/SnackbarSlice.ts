/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createSlice } from '@reduxjs/toolkit';
import { type AlertColor } from '@mui/lab/Alert';

interface snackBarData {
  type: AlertColor;
  message: string;
  open: boolean;
}

const initialState: snackBarData = {
  type: 'success', // error, warning, info, success,
  message: '',
  open: false,
};

export const snackbarSlice = createSlice({
  name: 'snackbarSlice',
  initialState,
  reducers: {
    showSuccessSnackbar(state, action) {
      return {
        ...state,
        type: 'success',
        message: action.payload,
        open: true,
      };
    },
    showInfoSnackbar(state, action) {
      return {
        ...state,
        type: 'info',
        message: action.payload,
        open: true,
      };
    },
    showWarningSnackbar(state, action) {
      return {
        ...state,
        type: 'warning',
        message: action.payload,
        open: true,
      };
    },
    showErrorSnackbar(state, action) {
      return {
        ...state,
        type: 'error',
        message: action.payload,
        open: true,
      };
    },
    closeSnackbar(state) {
      return {
        ...state,
        open: false,
      };
    },
  },
});

export const {
  closeSnackbar,
  showErrorSnackbar,
  showWarningSnackbar,
  showInfoSnackbar,
  showSuccessSnackbar,
} = snackbarSlice.actions;

export default snackbarSlice.reducer;
