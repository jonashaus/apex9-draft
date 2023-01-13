import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import UsersList from "../../components/admin/UsersList";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const supabase = useSupabaseClient();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from("profiles").select();
      setUsers(data);
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <UsersList />
    </div>
  );
};

export default AdminPanel;
