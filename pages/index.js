import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div className="container">
      <h1>Home</h1>
      <ul>
        <li>
          <Link href={"/account"}>My Account</Link>
        </li>
        <li>
          <Link href={"/account?vr=signupconfirm"}>Account</Link>
        </li>
        <li>
          <Link href={"/testing"}>Testing</Link>
        </li>
        <li>
          <Link href={"/admin"}>Admin</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
