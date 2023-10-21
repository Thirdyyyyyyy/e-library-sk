// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { closeSnackbar } from './SnackbarSlice';
// import { type RootState } from '~/redux-store/store';
// import { type AlertProps, type AlertColor } from '@mui/lab/Alert';
// import { useToast } from "@/components/ui/use-toast"

// const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
//   function Alert(props, ref) {
//     return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
//   }
// );

// export const Snackbar = () => {
//   const type: AlertColor = useSelector(
//     (state: RootState) => state.snackbarSlice.type
//   );
//   const open: boolean = useSelector(
//     (state: RootState) => state.snackbarSlice.open
//   );
//   const message: string = useSelector(
//     (state: RootState) => state.snackbarSlice.message
//   );

//   const { toast } = useToast()
//   const dispatch = useDispatch();
//   const onCloseHandler = () => dispatch(closeSnackbar());

//   return (
//     <MUISnackbar
//       id='snackbar'
//       open={open}
//       autoHideDuration={6000}
//       onClose={onCloseHandler}
//       anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//     >
//       <Alert severity={type} onClose={onCloseHandler}>
//         {message}
//       </Alert>
//     </MUISnackbar>
//   );
// };
