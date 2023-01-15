import { useState, useEffect, use } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Tags from "../elements/Tags";

const NewUsersList = () => {
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
    <div className="col col-12 col-md-6">
      <div className="c-hover rounded-5 p-3 mt-3">
        <h1>Users</h1>
        <div className="list-group list-group-flush">
          {users.map((user) => (
            <>
              <User
                user={user}
                key={user.id}
                activeUser={activeUser}
                setActiveUser={setActiveUser}
              />
              <UserModal user={user}>
                <Profile user={user} />
                <Roles user={user} />
              </UserModal>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

const User = ({ user }) => {
  return (
    <div className="list-group-item list-group-item-action bg-transparent">
      <button
        type="button"
        className="btn text-start px-0"
        data-bs-toggle="modal"
        data-bs-target={`#modal_${user.id}`}
      >
        {user.email}
      </button>
    </div>
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
    <div className="table-responsive">
      <h5 className="ms-1">Profile</h5>
      <table className="table table-sm table-borderless">
        <tbody>
          <tr>
            <td className="text-nowrap">Email:</td>
            <td className="text-secondary">{user.email}</td>
          </tr>
          <tr>
            <td className="text-nowrap">Usage:</td>
            <td className="text-secondary">{user.usage}</td>
          </tr>
          <tr>
            <td className="text-nowrap">Created at:</td>
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
            <td className="text-nowrap">Updated at:</td>
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
            <td className="text-nowrap">UserID:</td>
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
        toast.success("Added role!");
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
      toast.success("Removed role!");
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

export default NewUsersList;
