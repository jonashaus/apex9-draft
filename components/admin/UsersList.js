import { useState, useEffect, use } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import Tags from "../elements/Tags";

const UsersList = (props) => {
  const supabase = useSupabaseClient();
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState(null);

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
        <NewUser
          user={user}
          key={user.id}
          activeUser={activeUser}
          setActiveUser={setActiveUser}
        />
      ))}
    </div>
  );
};

const NewUser = ({ user }) => {
  return (
    <>
      <button
        type="button"
        className="btn btn-link fs-4 text-start px-0"
        data-bs-toggle="modal"
        data-bs-target={`#modal_${user.id}`}
      >
        {user.full_name}
      </button>
      <UserModal user={user}>
        <Profile user={user} />
        <Roles user={user} />
      </UserModal>
    </>
  );
};

const UserModal = ({ user, children }) => {
  const router = useRouter();
  return (
    <div className="modal fade" id={`modal_${user.id}`} tabIndex="-1">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">{user.full_name}</h3>
              <div className="col d-flex justify-content-end">
                <button
                  className="btn btn-warning text-white me-3"
                  data-bs-dismiss="modal"
                  onClick={() => router.push(`/account/${user.id}`)}
                >
                  <i className="bi bi-pencil-fill"></i>
                </button>
                <button className="btn btn-danger text-white">
                  <i className="bi bi-trash2-fill"></i>
                </button>
              </div>
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Profile = ({ user }) => {
  return (
    <div>
      <h5 className="ms-1">Profile</h5>
      <table className="table table-sm table-borderless">
        <tbody>
          <tr>
            <td>Email:</td>
            <td className="text-secondary">{user.email}</td>
          </tr>
          <tr>
            <td>Usage:</td>
            <td className="text-secondary">{user.usage}</td>
          </tr>
          <tr>
            <td>Created at:</td>
            <td className="text-secondary">
              {new Date(user.created_at).toLocaleString("de-CH")}{" "}
              <span className="badge bg-secondary">
                {(
                  (new Date().getTime() - new Date(user.created_at).getTime()) /
                  (1000 * 60 * 60 * 24)
                ).toFixed(0)}{" "}
                days ago
              </span>
            </td>
          </tr>
          <tr>
            <td>Updated at:</td>
            <td className="text-secondary">
              {new Date(user.updated_at).toLocaleString("de-CH")}{" "}
              <span className="badge bg-secondary">
                {(
                  (new Date().getTime() - new Date(user.updated_at).getTime()) /
                  (1000 * 60 * 60 * 24)
                ).toFixed(0)}{" "}
                days ago
              </span>
            </td>
          </tr>
          <tr>
            <td>UserID:</td>
            <td className="text-secondary">{user.id}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const Roles = ({ user }) => {
  const supabase = useSupabaseClient();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user", user.id);
      setRoles(data.map(({ role }) => role));
    };

    fetchRoles();
  }, [user]);

  const addTagHandler = async (tag) => {
    const { error } = await supabase.from("user_roles").upsert({
      user: user.id,
      role: tag,
      created_at: new Date().toISOString(),
    });
    if (error) {
      toast.error(error.details + " " + error.message);
    } else {
      setRoles((prevState) => {
        return [...prevState, tag];
      });
    }
  };

  const removeTagHandler = async (tag) => {
    const { error } = await supabase
      .from("user_roles")
      .delete()
      .eq("user", user.id)
      .eq("role", tag);
    if (error) {
      toast.error(error.details + " " + error.message);
    } else {
      setRoles(roles.filter((e) => e !== tag));
    }
  };
  return (
    <div>
      <h5 className="ms-1">Roles</h5>
      <Tags
        tags={roles}
        addTagHandler={addTagHandler}
        removeTagHandler={removeTagHandler}
        tagDescription="role"
      />
    </div>
  );
};

export default UsersList;
