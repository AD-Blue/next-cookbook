import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getSession, signIn, useSession } from "next-auth/react";

import Layout from "../components/layout/layout";
import RecipeList from "../components/recipe/recipe-list";

const Home = () => {
  const { data: session } = useSession();

  return (
    <Layout>
      {session && <RecipeList />}
      {!session && (
        <div>
          <h1>{"The NEXT Cookbook You'll Use"}</h1>
          <button onClick={() => signIn()}>Start Cooking</button>
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

export default Home;
