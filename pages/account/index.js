import { useContext } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { AppContext } from "../../context/AppContextProvider";

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  const { handleAddToast } = useContext(AppContext);

  return (
    <div className="container">
      <h1>Testing Toasts</h1>
      <p>
        Try clicking the button multiple times. Then you will see that every
        time a toast expires, the entire "list" of toasts is rerendered. This
        again causes the timers of the other toasts to be reset.
      </p>
      <p>I manually added the ID of the toast to the post to debug it.</p>
      <button
        className="btn btn-primary"
        onClick={() => handleAddToast("success", "Test")}
      >
        Create new Toast
      </button>
    </div>
  );
};

export default Home;
