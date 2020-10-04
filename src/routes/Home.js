import React from "react";
import { Button } from "@material-ui/core";
import { authService } from "fb";

const Home = () => {
  const handleLogout = async () => {
    await authService.signOut();
  };
  return (
    <div>
      <h3>Home</h3>
      <Button variant="outlined" onClick={handleLogout}>
        Log out
      </Button>
    </div>
  );
};

export default Home;
