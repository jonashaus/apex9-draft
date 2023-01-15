import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import UnauthorizedScreen from "../../components/elements/UnauthorizedScreen";
import Profile from "../../components/account/Profile";

const Account = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const [profile, setProfile] = useState({});

  const { userid } = router.query;

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const { data, error } = await supabase
          .from("profiles")
          .select()
          .eq("id", userid);
        if (error) {
          setProfile(null);
          toast.error("This user doesn't exist.");
        } else {
          setProfile(data[0]);
        }
      };
      fetchData();
    }
  }, [userid]);

  if (!user) {
    return <UnauthorizedScreen />;
  }

  if (!profile) {
    return null;
  }

  return (
    <>
      <Profile profile={profile} />
    </>
  );
};

export default Account;
