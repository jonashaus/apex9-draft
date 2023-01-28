import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import UnauthorizedScreen from "./UnauthorizedScreen";
import LoadingScreen from "./LoadingScreen";

const RoleWrapper = ({ requiredRoles, children }) => {
  const [loading, setLoading] = useState(false);
  const [protectedContentVisible, setProtectedContentVisible] = useState(true);

  const supabase = useSupabaseClient();
  const user = useUser();

  const fetchIfUserHasRoles = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user", user.id);
    setProtectedContentVisible(
      requiredRoles.every((requiredRole) =>
        data.map(({ role }) => role).includes(requiredRole)
      )
    );
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      fetchIfUserHasRoles();
    }
  }, [requiredRoles, user]);

  if (loading) return <LoadingScreen />;

  return (
    <div className="container">
      {!protectedContentVisible ? <UnauthorizedScreen /> : <>{children}</>}
    </div>
  );
};

export default RoleWrapper;
