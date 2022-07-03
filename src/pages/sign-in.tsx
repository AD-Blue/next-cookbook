import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { useSession, signIn, getSession } from "next-auth/react";

import Layout from "../components/layout/layout";

interface SignInProps {
  session: Session;
}

const SignIn = ({ session }: SignInProps) => {
  return (
    <Layout>
      {!session && (
        <div>
          <h1>The NEXT Cookbook For You</h1>
          <button onClick={() => signIn()}>Start Cooking</button>
        </div>
      )}
    </Layout>
  );
};

const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export { getServerSideProps };

export default SignIn;
