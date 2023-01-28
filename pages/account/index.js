import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import UnauthorizedScreen from "../../components/elements/UnauthorizedScreen";
import Profile from "../../components/account/Profile";

const MyAccount = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const { data, error } = await supabase
          .from("profiles")
          .select()
          .eq("id", user.id);
        setProfile(data[0]);
      };
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    if (user && router.query.vr == "signupconfirm") {
      const fetchData = async () => {
        const { data, error } = await supabase
          .from("auto_assign_roles")
          .select()
          .eq("domain", user.email.substring(user.email.indexOf("@") + 1));
        return data;
      };
      const autoAssignRoles = async () => {
        const aars = await fetchData();
        aars.every(async (aar) => {
          const { error } = await supabase.from("user_roles").insert({
            user: user.id,
            role: aar.role,
            created_at: new Date().toISOString(),
          });
        });
        toast.success(
          "Based on your email address, we automatically assigned the following roles to you:" +
            aars.map(({ role }) => " " + role).toString()
        );
      };
      autoAssignRoles();
    }
  }, [router]);

  if (!user) {
    return <UnauthorizedScreen />;
  }

  return <Profile profile={profile} editable />;
};

export default MyAccount;
