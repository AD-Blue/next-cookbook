import { useRouter } from "next/router";
import { getSession, signOut, useSession } from "next-auth/react";

import Layout from "../../components/layout/layout";
import { GetServerSideProps } from "next";

const User = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const userEmail = router.query.user;
  const isOwnProfile = userEmail === session?.user?.email;

  return (
    <Layout>
      {!isOwnProfile && <h1>{`Welcome to ${userEmail}'s profile`}</h1>}
      {isOwnProfile && (
        <div>
          <h1>Welcome back, {session?.user?.name}</h1>
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
      )}
    </Layout>
  );
};

const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export { getServerSideProps };

export default User;
