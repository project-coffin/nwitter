import React from "react";
import { useForm } from "react-hook-form";
import { Button, Divider, TextField, makeStyles } from "@material-ui/core";
import { dbService } from "fb";
import Nweet from "components/Nweet";

const useStyles = makeStyles({
  field: {
    marginRight: 15,
  },
  divider: {
    margin: "30px 0",
  },
});

const Home = ({ viewer }) => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const [nweets, setNweets] = React.useState([]);
  const onSubmit = async (data) => {
    await dbService.collection("nweets").add({
      text: data?.nweet,
      createdAt: new Date(),
      authorId: viewer?.uid,
    });
  };

  React.useEffect(() => {
    dbService.collection("nweets").onSnapshot((snapshot) => {
      const nweetList = snapshot?.docs?.map((doc) => ({
        id: doc?.id,
        ...doc.data(),
      }));
      setNweets(nweetList);
    });
  }, []);

  return (
    <div>
      <h3>Home</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="nweet"
          name="nweet"
          inputRef={register}
          variant="outlined"
          className={classes.field}
        />
        <Button onClick={handleSubmit(onSubmit)} variant="outlined">
          submit
        </Button>
      </form>

      <Divider className={classes.divider} />

      <div>
        {nweets?.map((nweet) => (
          <Nweet
            nweet={nweet}
            key={nweet?.id}
            isAuthor={viewer?.uid === nweet?.authorId}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
