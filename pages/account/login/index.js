import { useContext, useEffect } from "react";
import { AppContext } from "../../../context/AppContextProvider";
import CredentialForm from "../../../components/elements/CredentialForm";
import CredentialsWrapper from "../../../components/elements/CredentialsWrapper";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import loginSVG from "../../../public/images/login.svg";
import { useRouter } from "next/router";

const Login = () => {
  const { handleAddToast } = useContext(AppContext);
  const supabase = useSupabaseClient();
  const router = useRouter();

  const user = useUser();
  useEffect(() => {
    if (user) {
      handleAddToast("success", "You're already logged in!");
      router.push("/");
    }
  }, []);

  const submitHandler = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      handleAddToast("danger", error.message);
    } else {
      handleAddToast("success", "Welcome back!");
      router.push("/");
    }
  };

  return (
    <>
      <CredentialsWrapper title="Login" image={loginSVG}>
        <CredentialForm
          submitButtonText="Login"
          submitHandler={submitHandler}
          leftButtonText="Register"
          leftButtonRoute="/account/register"
          centerButtonText="Forgot your password?"
          centerButtonRoute="/account/forgotpassword"
        ></CredentialForm>
      </CredentialsWrapper>
    </>
  );
};
export default Login;
