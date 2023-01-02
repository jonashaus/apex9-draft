import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "../../components/account/Account";
import Login from "./login";
import Register from "./register";

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div className="container">
      <h1>Account</h1>
    </div>
  );
};

export default Home;
