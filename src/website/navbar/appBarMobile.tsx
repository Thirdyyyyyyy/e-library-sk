// import React, { useState } from 'react';
// import { Typography, Box, Button, AppBar, Toolbar } from '@mui/material';
// import IconButton from '@mui/material/IconButton';
// import Image from 'next/image';
// import psalmLogo from '~/../public/psalm.png';
// import CssBaseline from '@mui/material/CssBaseline';
// import Stack from '@mui/material/Stack';
// import { useRouter } from 'next/router';
// // import AppDrawer from "./AppDrawer";

// const ApplicationBarMobile = () => {
//   const router = useRouter();

//   const [openDrawer, setOpenDrawer] = useState(false);

//   const handleLoginClick = async () => {
//     await router.push('/login');
//   };

//   const handleLogoClick = async () => {
//     await router.push('/');
//   };
//   return (
//     <>
//       <Box
//         sx={{ display: 'flex', flexGrow: 1, justifyContent: 'space-between' }}
//       >
//         <CssBaseline />
//         <AppBar position='sticky' color='transparent'>
//           <Toolbar>
//             <IconButton
//               edge='start'
//               color='inherit'
//               aria-label='menu'
//               sx={{ mr: 2 }}
//               onClick={(event) => {
//                 event.preventDefault();
//                 handleLogoClick().catch((error) => {
//                   // handle error here
//                 });
//               }}
//             >
//               <Image
//                 alt='Psalm Logo'
//                 src={psalmLogo}
//                 // fill
//                 width={50}
//                 height={50}
//               />
//             </IconButton>

//             <Typography>PSALM GENSAN</Typography>
//             <Stack direction='row' spacing={1} sx={{ flexGrow: 1 }}>
//               {/* <Button
//                 color="inherit"
//                 onClick={(event) => {
//                   event.preventDefault();
//                   handleLoginClick().catch((error) => {
//                     // handle error here
//                   });
//                 }}
//                 sx={{ flexGrow: 1 }}
//               >
//                 Login
//               </Button> */}
//             </Stack>
//           </Toolbar>
//         </AppBar>
//       </Box>
//       {/* <AppDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} /> */}
//     </>
//   );
// };

// export default ApplicationBarMobile;
