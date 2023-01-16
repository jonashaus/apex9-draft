import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import UsersOnlyWrapper from "../../components/elements/UsersOnlyWrapper";
import SpecialListCard from "../../components/elements/SpecialListCard";
import UserModal from "../../components/admin/UserModal";

const AdminPanel = () => {
  return (
    <UsersOnlyWrapper>
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
    </UsersOnlyWrapper>
  );
};

const UserCard = () => {
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
    <SpecialListCard
      itemTitles={users.map(({ email }) => email)}
      itemIDs={users.map(({ id }) => id)}
      items={users}
      filterMode="filterData"
      title="Users"
    >
      {({ title, id, data }) => (
        <>
          <button
            type="button"
            className="list-group-item list-group-item-action border-0 border-bottom"
            data-bs-toggle="modal"
            data-bs-target={`#modal_${data.id}`}
          >
            {title + " "}
            <span className="badge bg-secondary rounded-pill d-none d-md-inline">
              {id}
            </span>{" "}
          </button>
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
    const fetchData = async () => {
      const getRoles = async () => {
        const { data } = await supabase.from("roles").select();
        setRoles(data);
      };
      getRoles();
    };
    fetchData();
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

  /* Enable Bootstrap Tooltips */
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );

  const extraComponent = (
    <i class="bi bi-plus-square-fill text-success fs-2 ms-3 lh-1" />
  );

  return (
    <SpecialListCard
      itemTitles={rolesWithAdditionalInfo.map(({ name }) => name)}
      itemIDs={rolesWithAdditionalInfo.map(({ name }) => name)}
      items={rolesWithAdditionalInfo}
      title="Roles"
      filterMode="filterData"
      extraComponent={extraComponent}
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
              <span
                className="badge bg-secondary"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-custom-class="custom-tooltip"
                data-bs-title={`The count of users this role is assigned to.`}
              >{`${data.assignedUsersCount}`}</span>
            </div>
          </div>
        </>
      )}
    </SpecialListCard>
  );
};

export default AdminPanel;
