import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "../../components/account/Account";
import Login from "../../components/account/Login";

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      {!session ? <Login session={session} /> : <Account session={session} />}
    </div>
  );
};

export default Home;
