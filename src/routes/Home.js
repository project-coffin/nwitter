import React from "react";
import { Divider, makeStyles } from "@material-ui/core";
import { dbService } from "fb";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";

const useStyles = makeStyles({
  divider: {
    margin: "30px 0",
  },
});

const Home = ({ viewer }) => {
  const classes = useStyles();
  const [nweets, setNweets] = React.useState([]);

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

      <NweetFactory viewerId={viewer?.uid} />

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
