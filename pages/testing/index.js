import { useUser } from "@supabase/auth-helpers-react";

const Test = () => {
  const user = useUser();
  return (
    <>
      {!user && <div>Nothing</div>}
      {user && <div>{user.id}</div>}
    </>
  );
};

export default Test;
