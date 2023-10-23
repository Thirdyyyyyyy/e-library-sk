// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/router';
// import React from 'react';
// import MainApplicationBar from '~/features/mainApp/mainAppBar/mainAppBar';
// import UserContainer from '~/features/users/UserContainer';
// const User = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const session = useSession();

//   const userId: string = Array.isArray(id) ? id.join('') : id ?? '';

//   if (!session || session.status === 'unauthenticated') {
//     router.push('/login').catch((error) => {
//       console.error('Error while redirecting:', error);
//     });
//     return null; // Return null or loading indicator while redirecting
//   }

//   const currentUserId = session.data?.user.id;

//   const canEdit = currentUserId === userId;

//   return (
//     <>
//       <MainApplicationBar />
//       <UserContainer userId={userId} canEdit={canEdit} />
//     </>
//   );
// };

// export default User;
