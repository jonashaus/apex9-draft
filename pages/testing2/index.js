import { useUser } from "@supabase/auth-helpers-react";
import LoadingScreen from "../../components/elements/LoadingScreen";

const Profile = () => {
  // Fetch the user client-side
  const user = useUser({ redirectTo: "/login" });

  // Server-render loading state
  if (!user) {
    return <LoadingScreen />;
  }

  // Once the user request finishes, show the user
  return (
    <>
      <h1>Your Profile</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
};

export default Profile;
