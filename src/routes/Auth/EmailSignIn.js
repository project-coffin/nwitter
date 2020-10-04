import React from "react";
import { useForm } from "react-hook-form";
import { Button, TextField, makeStyles } from "@material-ui/core";
import { authService } from "fb";

const useStyles = makeStyles({
  field: {
    marginRight: 15,
  },
  fieldWrapper: {
    marginBottom: 15,
  },
  toggleButton: {
    cursor: "pointer",
    textDecoration: "underline",
    color: "#999",
  },
});

const EmailSignIn = () => {
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [isNewAccount, setIsNewAccount] = React.useState(true);
  const onSubmit = async (data) => {
    const { email, password } = data || {};
    if (!email || !password) return;

    try {
      if (isNewAccount) {
        await authService.createUserWithEmailAndPassword(email, password);
      } else {
        await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const classes = useStyles();

  return (
    <div>
      <h3>{isNewAccount ? "Sign up" : "Sign in"}</h3>
      <form>
        <div className={classes.fieldWrapper}>
          <TextField
            className={classes.field}
            label="email"
            name="email"
            inputRef={register({ required: true })}
            variant="outlined"
            error={!!errorMessage}
            helperText={errorMessage}
            required
          />
          <TextField
            label="password"
            name="password"
            type="password"
            inputRef={register({ required: true })}
            variant="outlined"
            required
          />
        </div>
        <Button onClick={handleSubmit(onSubmit)} variant="outlined">
          {isNewAccount ? "Sign up" : "Sign in"}
        </Button>
      </form>

      <p
        className={classes.toggleButton}
        onClick={() => setIsNewAccount((prev) => !prev)}
      >
        Click this for {isNewAccount ? "sign in" : "sign up"}
      </p>
    </div>
  );
};

export default EmailSignIn;
