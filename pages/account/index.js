import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "../../components/account/Account";
import Login from "./login";
import Register from "./register";

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      {!session ? <Login /> : <Account session={session} />}
    </div>
  );
};

export default Home;
