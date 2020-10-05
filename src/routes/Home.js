import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { Button, Divider, TextField, makeStyles } from "@material-ui/core";
import { dbService, storageService } from "fb";
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
  const { register, handleSubmit, watch, setValue } = useForm();
  const [nweets, setNweets] = React.useState([]);
  const [imageUrl, setImageUrl] = React.useState();
  const onSubmit = async (data) => {
    let downloadUrl;
    if (imageUrl) {
      const fileRef = storageService.ref().child(`${viewer?.uid}/${uuidv4()}`);
      const res = await fileRef.putString(imageUrl, "data_url");
      downloadUrl = await res.ref.getDownloadURL();
    }

    await dbService.collection("nweets").add({
      text: data?.nweet,
      createdAt: new Date(),
      authorId: viewer?.uid,
      ...(downloadUrl && { photo: downloadUrl }),
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

  // handle image
  const image = watch("image");
  const reader = new FileReader();
  reader.onloadend = (finishedEvent) => {
    setImageUrl(finishedEvent.currentTarget.result);
  };
  if (image?.[0]) {
    reader.readAsDataURL(image?.[0]);
  }

  const handleImageClear = () => {
    setValue("image", null);
    setImageUrl(null);
  };

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
        <TextField
          name="image"
          type="file"
          inputRef={register}
          variant="outlined"
          className={classes.field}
        />
        <Button onClick={handleSubmit(onSubmit)} variant="outlined">
          submit
        </Button>
      </form>

      {imageUrl && (
        <>
          <img src={imageUrl} width="50px" height="50px" alt="nweet" />
          <Button onClick={handleImageClear}>Clear Photo</Button>
        </>
      )}

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
