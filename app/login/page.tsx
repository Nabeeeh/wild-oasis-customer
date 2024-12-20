import { Metadata } from "next";
import GoogleSignInButton from "../_components/GoogleSignInButton";
import { signInAction } from "../_lib/actions";

export const metadata: Metadata = {
  title: "Login",
};

const LoginPage = () => {
  return (
    <section className="flex flex-col gap-10 mt-8 items-center">
      <h2 className="text-3xl font-semibold">
        Sign in to access your guest area
      </h2>

      <form action={signInAction}>
        <GoogleSignInButton />
      </form>
    </section>
  );
};

export default LoginPage;
