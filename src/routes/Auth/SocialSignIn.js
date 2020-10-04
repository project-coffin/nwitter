import React from "react";
import { Button } from "@material-ui/core";
import { fbInstance, authService } from "fb";

const SocialSignIn = () => {
  const handleClick = async (e) => {
    let provider;
    switch (e.currentTarget.name) {
      case "google":
        provider = new fbInstance.auth.GoogleAuthProvider();
        break;
      case "github":
        provider = new fbInstance.auth.GithubAuthProvider();
        break;
      default:
        return;
    }

    authService.useDeviceLanguage();
    await authService.signInWithPopup(provider);
  };
  return (
    <div>
      <h3>Social Sign in</h3>

      <Button
        variant="outlined"
        onClick={handleClick}
        style={{ marginRight: 15 }}
        name="google"
      >
        Google
      </Button>
      <Button variant="outlined" onClick={handleClick} name="github">
        Github
      </Button>
    </div>
  );
};

export default SocialSignIn;
