import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div className="container">
      <h1>Home</h1>
      <Link href={"/account"}>My Account</Link>
    </div>
  );
};

export default Home;
