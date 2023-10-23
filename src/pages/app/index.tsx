import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const App: NextPage = () => {
  const session = useSession(); // Destructure data and status from useSession()
  console.log('inside app session', session);

  const router = useRouter();

  if (!session || session.status === 'unauthenticated') {
    router.push('/login').catch((error) => {
      console.error('Error while redirecting:', error);
    });
    return null; // Return null or loading indicator while redirecting
  }

  const userId = session.data?.user.id;

  if (userId) {
    return (
      <>
      test
      </>
    );
  } else {
    return 'Loading...';
  }
};

export default App;
