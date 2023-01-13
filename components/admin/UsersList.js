import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const UsersList = () => {
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
      <h1>Users</h1>
      {users.map((user) => (
        <User user={user} />
      ))}
    </div>
  );
};

const User = ({ user }) => {
  return (
    <div className="row mb-3">
      <h2 className="col align-self-center text-truncate">
        {user.full_name || "Anonymous User"}
      </h2>
      <div className="col">
        <p className="mb-0">{user.email}</p>
        <small>ID: {user.id}</small>
      </div>
      <div className="col d-flex justify-content-end">
        <button className="btn btn-warning text-white me-3">
          <i className="bi bi-pencil-fill"></i>
        </button>
        <button className="btn btn-danger text-white">
          <i className="bi bi-trash2-fill"></i>
        </button>
      </div>
    </div>
  );
};

export default UsersList;
