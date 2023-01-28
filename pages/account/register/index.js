import CredentialForm from "../../../components/elements/CredentialForm";
import CredentialsWrapper from "../../../components/elements/CredentialsWrapper";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import registerSVG from "../../../public/images/register.svg";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Register = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      toast.info("You're already logged in, no need to register again!");
      router.push("/");
    }
  });

  const submitHandler = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Check your email for the confirmation link.");
    }
  };

  return (
    <CredentialsWrapper title="Register" image={registerSVG}>
      <CredentialForm
        submitButtonText="Register"
        submitHandler={submitHandler}
        leftButtonText="Login"
        leftButtonRoute="/account/login"
        scorePassword
      ></CredentialForm>
    </CredentialsWrapper>
  );
};

export default Register;
