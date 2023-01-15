import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import UsersOnlyWrapper from "../../components/elements/UsersOnlyWrapper";
import SpecialListCard from "../../components/admin/SpecialListCard";
import UserModal from "../../components/admin/UserModal";
import Image from "next/image";
import code1 from "../../public/images/code1.png";
import code2 from "../../public/images/code2.png";

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
      <h1>Steven - das isch was ich meine :D</h1>
      <div className="row">
        <div className="col">
          <SpecialListCard
            itemTitles={users.map(({ email }) => email)}
            itemIDs={users.map(({ id }) => id)}
            items={users}
            title="Users"
          >
            {(title, id, user) => (
              <>
                <button
                  type="button"
                  className="list-group-item list-group-item-action"
                  data-bs-toggle="modal"
                  data-bs-target={`#modal_${id}`}
                >
                  {title}
                </button>
                <UserModal user={user} />
              </>
            )}
          </SpecialListCard>
          <Image src={code1} alt="" width={600} />
        </div>
        <div className="col">
          <SpecialListCard
            itemTitles={users.map(({ email }) => email)}
            itemIDs={users.map(({ id }) => id)}
            items={users}
            title="Users 2"
          >
            {(title, id, user) => (
              <>
                <button
                  type="button"
                  className="list-group-item list-group-item-action"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse_${id}`}
                >
                  {title}{" "}
                  <span className="badge bg-primary rounded-pill">{id}</span>
                  <span className="badge bg-danger rounded-pill">
                    {user.email.length}
                  </span>
                </button>
                <div className="collapse" id={`collapse_${id}`}>
                  <div className="card card-body">
                    <span className="badge bg-warning rounded-pill">{id}</span>
                    Some placeholder content for the collapse component. This
                    panel is hidden by default but revealed when the user
                    activates the relevant trigger.
                  </div>
                </div>
              </>
            )}
          </SpecialListCard>
          <Image src={code2} alt="" width={600} />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
