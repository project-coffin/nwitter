import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { authService } from "fb";

const Profile = () => {
  const history = useHistory();
  const handleLogout = async () => {
    await authService.signOut();
    history.push("/");
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleLogout}>
        Log out
      </Button>
    </div>
  );
};

export default Profile;
