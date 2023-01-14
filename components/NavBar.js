import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Link from "next/link";

const NavBar = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-3">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          apex9
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContents"
          aria-controls="navbarContents"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarContents">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" href={"/account/login"}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href={"/account/register"}>
                    Register
                  </Link>
                </li>
              </>
            )}
            {user && (
              <>
                {" "}
                <li className="nav-item">
                  <a
                    className="nav-link btn btn-link py-0"
                    onClick={async () => {
                      await supabase.auth.signOut();
                    }}
                  >
                    Logout
                  </a>
                </li>
                <li className="nav-item">
                  <button
                    className="btn py-0 border-0"
                    onClick={() => router.push("/account")}
                  >
                    <i className="bi bi-person-circle text-light fs-4"></i>
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
