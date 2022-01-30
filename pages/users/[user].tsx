import { useRouter } from "next/router";
import { getSession, signOut, useSession } from "next-auth/react";

import Layout from "../../components/layout/layout";
import { GetServerSideProps } from "next";
import useSWR from "swr";
import fetcher from "../../lib/swr-fetcher";
import RecipeList from "../../components/recipe/recipe-list";

const User = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const profileRecipesUrl = `/api/profile/recipes?user=${encodeURIComponent(
    session?.user?.email as string
  )}`;
  const { data: profileRecipes, error: profileRecipesError } = useSWR(
    profileRecipesUrl,
    fetcher
  );

  if (profileRecipesError) {
    return <p>{"Error, could not load user's recipes"}</p>;
  }

  if (!profileRecipes) {
    return <p>Loading...</p>;
  }

  const userEmail = router.query.user;
  const isOwnProfile = userEmail === session?.user?.email;

  return (
    <Layout>
      {!isOwnProfile && <h1>{`Welcome to ${userEmail}'s profile`}</h1>}
      {isOwnProfile && (
        <div>
          <h1>Welcome back, {session?.user?.name}</h1>
          {profileRecipes.data.length !== 0 && (
            <>
              <p>Your Uploaded Recipes</p>
              <RecipeList recipeData={profileRecipes.data} />
            </>
          )}
          {profileRecipes.data.length === 0 && (
            <>
              <p>
                {
                  "You haven't uploaded any recipes yet! Go to the 'Create' page to make some!"
                }
              </p>
            </>
          )}
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
