// import { type NextPage } from 'next';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/router';
// import MainApplicationBar from '~/features/mainApp/mainAppBar/mainAppBar';
// import { UsersContainer } from '~/features/mainApp/users/UsersContainer';

// const AllUsers: NextPage = () => {
//   const session = useSession(); // Destructure data and status from useSession()

//   const router = useRouter();

//   if (!session || session.status === 'unauthenticated') {
//     router.push('/login').catch((error) => {
//       console.error('Error while redirecting:', error);
//     });
//     return null; // Return null or loading indicator while redirecting
//   }

//   const userId = session.data?.user.id;

//   return (
//     <>
//       <MainApplicationBar />
//       <UsersContainer userId={userId} />
//     </>
//   );
// };

// export default AllUsers;
