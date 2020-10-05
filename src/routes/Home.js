import React from "react";
import { useForm } from "react-hook-form";
import { Button, TextField, makeStyles } from "@material-ui/core";
import { dbService } from "fb";

const useStyles = makeStyles({});

const Home = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    await dbService.collection("nweets").add({
      nweet: data?.nweet,
      createdAt: new Date(),
    });
  };

  return (
    <div>
      <h3>Home</h3>

      <form>
        <TextField
          label="nweet"
          name="nweet"
          inputRef={register}
          variant="outlined"
        />
        <Button onClick={handleSubmit(onSubmit)} variant="outlined">
          submit
        </Button>
      </form>
    </div>
  );
};

export default Home;
