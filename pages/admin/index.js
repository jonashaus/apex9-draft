import { useState, useEffect, use } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import RoleWrapper from "../../components/elements/RoleWrapper";
import SpecialListCard from "../../components/elements/SpecialListCard";
import UserModal from "../../components/admin/UserModal";
import { toast } from "react-toastify";

const AdminPanel = () => {
  return (
    <RoleWrapper requiredRoles={["admin"]}>
      <div className="container">
        <h1>Admin Dashboard</h1>
        <div className="row">
          <div className="col">
            <UserCard />
          </div>
          <div className="col">
            <RolesCard />
          </div>
        </div>
      </div>
    </RoleWrapper>
  );
};

const UserCard = () => {
  const [users, setUsers] = useState([]);
  const supabase = useSupabaseClient();

  useEffect(() => {
    const fetchProfiles = async () => {
      const { data } = await supabase.from("profiles").select();
      setUsers(data);
    };
    fetchProfiles();
  }, []);

  return (
    <SpecialListCard
      itemTitles={users.map(({ email }) => email)}
      itemIDs={users.map(({ id }) => id)}
      items={users}
      filterMode="filterData"
      title="Users"
    >
      {({ title, id, data }) => (
        <>
          <div
            className="list-group-item list-group-item-action border-0 border-bottom d-flex justify-content-between"
            data-bs-toggle="modal"
            data-bs-target={`#modal_${data.id}`}
          >
            <div>{title}</div>
            <span className="badge bg-secondary rounded-pill d-none d-md-inline">
              {id}
            </span>
          </div>
          <UserModal user={data} />
        </>
      )}
    </SpecialListCard>
  );
};

const RolesCard = () => {
  const [roles, setRoles] = useState([]);
  const [rolesWithAdditionalInfo, setRolesWithAdditionalInfo] = useState([]);
  const supabase = useSupabaseClient();

  useEffect(() => {
    const fetchRoles = async () => {
      const { data } = await supabase.from("roles").select();
      setRoles(data);
    };
    fetchRoles();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const getUserRoles = async () => {
        const { data } = await supabase.from("user_roles").select();
        setRolesWithAdditionalInfo(
          roles.map((role) => {
            return {
              name: role.name,
              dangerous: role.dangerous,
              assignedUsersCount: data.filter((userRole) => {
                return userRole.role == role.name;
              }).length,
            };
          })
        );
      };
      getUserRoles();
    };
    fetchData();
  }, [roles]);

  return (
    <SpecialListCard
      itemTitles={rolesWithAdditionalInfo.map(({ name }) => name)}
      itemIDs={rolesWithAdditionalInfo.map(({ name }) => name)}
      items={rolesWithAdditionalInfo}
      title="Roles"
      filterMode="filterData"
    >
      {({ title, id, data }) => (
        <>
          <div className="list-group-item list-group-item-action border-0 border-bottom d-flex justify-content-between">
            <div>
              {title + " "}
              {data.dangerous && (
                <span className="badge bg-danger rounded-pill">dangerous</span>
              )}
            </div>
            <div className="d-flex justify-content-end align-items-center">
              <span className="badge rounded-pill bg-secondary">{`${data.assignedUsersCount} users`}</span>
            </div>
          </div>
        </>
      )}
    </SpecialListCard>
  );
};

export default AdminPanel;
