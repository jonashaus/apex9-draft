import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const MyAccount = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const [myProfile, setMyProfile] = useState({});
  console.log(user);

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        try {
          const { data, error } = await supabase
            .from("profiles")
            .select()
            .eq("id", user.id);
          if (error) {
            throw error;
          }
          if (data) {
            await setMyProfile(data[0]);
          }
        } catch (error) {
          toast.error(error.message);
        } finally {
        }
      };

      fetchProfile;
      toast.success("You are logged in");
    } else {
      toast.warning("You are not logged in!");
    }
  }, []);

  return <div className="container">{user.id}</div>;
};

export default MyAccount;
