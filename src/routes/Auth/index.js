import React from "react";
import { Divider, makeStyles } from "@material-ui/core";
import EmailSignIn from "./EmailSignIn";
import SocialSignIn from "./SocialSignIn";

const useStyles = makeStyles({
  root: {
    padding: 30,
  },
  divider: {
    margin: "30px 0",
  },
});

const Auth = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <EmailSignIn />
      <Divider className={classes.divider} />
      <SocialSignIn />
    </div>
  );
};

export default Auth;
