import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const MyAccount = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  console.log(user);
  const router = useRouter();
  const [myProfile, setMyProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
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
      } else {
        toast.warning("You are not logged in!");
      }
    };

    fetchProfile();
  }, []);

  return <div className="container">{myProfile.full_name}</div>;
};

export default MyAccount;
