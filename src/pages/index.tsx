import { GetServerSideProps } from "next";
import { getSession, signIn, useSession } from "next-auth/react";
import useSWR from "swr";

import Layout from "../components/layout/layout";
import RecipeList from "../components/recipe/recipe-list";
import fetcher from "../../lib/swr-fetcher";

const Home = () => {
  const { data: session } = useSession();

  const { data: recipeData, error: recipeError } = useSWR(
    "/api/recipe/recipes",
    fetcher
  );

  if (recipeError) {
    return <p>Error fetching recipe data</p>;
  }

  if (!recipeData) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <RecipeList recipeData={recipeData.data} />
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
