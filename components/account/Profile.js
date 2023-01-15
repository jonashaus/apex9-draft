import Image from "next/image";
import Router, { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "react-toastify";

const Profile = ({ profile }) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  const [editable, setEditable] = useState(false);

  const [fullName, setFullName] = useState();
  const [usage, setUsage] = useState();

  useEffect(() => {
    setFullName(profile.full_name);
    setUsage(profile.usage);

    if (user) {
      if (user.id === profile.id) {
        setEditable(true);
        toast.success("Make sure your profile is up to date.");
      }
    }
  }, [profile, user]);

  const handleUsageChange = (e) => {
    setUsage(e.target.value);
  };

  const handleSaveChanges = async () => {
    const updates = {
      id: profile.id,
      full_name: fullName,
      usage: usage,
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase.from("profiles").upsert(updates);
    if (error) {
      toast.error(error);
    } else {
      toast.success("Changes saved!");
    }
  };

  /* Enable Bootstrap Tooltips */
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );

  return (
    <main
      className="container d-flex align-items-center"
      style={{ minHeight: "85vh" }}
    >
      <form className="container" style={{ maxWidth: "800px" }}>
        <h1 className="mb-5 text-center">{fullName || "Anonymous"}</h1>
        {editable && (
          <div className="row mb-3">
            <label htmlFor="inputFullName" className="col-sm-2 col-form-label">
              Full Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="inputFullName"
                value={fullName || ""}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </div>
        )}
        <div className="row mb-3">
          <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              value={profile.email || ""}
              disabled
            />
          </div>
        </div>
        {editable && (
          <fieldset className="row mb-3">
            <legend className="col-form-label col-sm-2 pt-0">
              Usage{" "}
              <i
                className="bi bi-info-circle text-primary"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                data-bs-custom-class="custom-tooltip"
                data-bs-title="Just asking for statistics, using apex9 is free for everyone - even commercial users."
              ></i>
            </legend>
            <div className="col-sm-10">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="radioPrivate"
                  value="private"
                  checked={usage == "private"}
                  onChange={handleUsageChange}
                />
                <label className="form-check-label" htmlFor="radioPrivate">
                  Private
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="radioEducation"
                  value="education"
                  checked={usage == "education"}
                  onChange={handleUsageChange}
                />
                <label className="form-check-label" htmlFor="radioEducation">
                  Education
                </label>
              </div>
              <div className="form-check disabled">
                <input
                  className="form-check-input"
                  type="radio"
                  id="radioCommercial"
                  value="commercial"
                  checked={usage == "commercial"}
                  onChange={handleUsageChange}
                />
                <label className="form-check-label" htmlFor="radioCommercial">
                  Commercial
                </label>
              </div>
            </div>
          </fieldset>
        )}
        {editable && (
          <div className="row mb-3">
            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-link ps-0"
                onClick={() => router.push("/account/changepassword")}
              >
                Change Password
              </button>
              <button
                type="button"
                className="btn btn-link ps-0"
                onClick={() => router.push("/account/changeemail")}
              >
                Change Email
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </form>
    </main>
  );
};

export default Profile;
