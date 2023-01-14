import CredentialForm from "../../../components/elements/CredentialForm";
import CredentialsWrapper from "../../../components/elements/CredentialsWrapper";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import changepasswordSVG from "../../../public/images/change_password.svg";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const ChangeEmail = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  const submitHandler = async (email, password) => {
    try {
      if (!user) {
        toast.warn("You have to log in before you can change your email!");
      } else {
        const { data, error } = await supabase.auth.updateUser({
          email: email,
        });
        if (error) {
          throw error;
        } else {
          const updates = {
            id: user.id,
            email,
            updated_at: new Date().toISOString(),
          };

          let { error } = await supabase.from("profiles").upsert(updates);
          if (error) {
            throw error;
          }
          toast.success(
            `Please click the link that you just received on ${email} to confirm your new email.`
          );
          router.push("/");
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <CredentialsWrapper title="Change Email" image={changepasswordSVG}>
      <CredentialForm
        submitButtonText="Change"
        submitHandler={submitHandler}
        noPassword
      ></CredentialForm>
    </CredentialsWrapper>
  );
};

export default ChangeEmail;
