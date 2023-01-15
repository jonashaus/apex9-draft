import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import UnauthorizedScreen from "../../components/elements/UnauthorizedScreen";
import Profile from "../../components/account/Profile";

const UsersOnlyWrapper = (props) => {
  const supabase = useSupabaseClient();
  const user = useUser();

  if (!user) {
    return <UnauthorizedScreen />;
  } else {
    return <>{props.children}</>;
  }
};

export default UsersOnlyWrapper;
