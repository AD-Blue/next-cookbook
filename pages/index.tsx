import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";

import Layout from "../components/layout/layout";

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <Layout>
      <h1>Home</h1>
      {!session && <button onClick={() => signIn()}>Sign In</button>}
      {session && <p>Signed in as {session.user?.name}</p>}
    </Layout>
  );
};

export default Home;
