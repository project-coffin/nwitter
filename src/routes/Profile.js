import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Button, Divider, TextField } from "@material-ui/core";
import { authService, dbService, storageService } from "fb";

const Profile = ({ viewer }) => {
  const [myNweets, setMyNweets] = React.useState([]);
  const [imageUrl, setImageUrl] = React.useState(null);
  const history = useHistory();
  const { register, handleSubmit, watch } = useForm();
  const handleLogout = async () => {
    await authService.signOut();
    history.push("/");
  };

  const getMyNweets = async () => {
    const nweets = await dbService
      .collection("nweets")
      .where("authorId", "==", viewer?.uid)
      .orderBy("createdAt")
      .get();

    setMyNweets(nweets.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    getMyNweets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data) => {
    if (!data?.username || data?.username === viewer?.displayName) return;

    let downloadUrl;
    if (imageUrl) {
      const fileRef = storageService.ref().child(`${viewer?.uid}/${uuidv4()}`);
      const res = await fileRef.putString(imageUrl, "data_url");
      downloadUrl = await res.ref.getDownloadURL();
    }

    await viewer.updateProfile({
      displayName: data?.username,
      ...(downloadUrl && { photoURL: downloadUrl }),
    });
  };

  const photo = watch("photo");
  const reader = new FileReader();
  reader.onloadend = (finishedEvent) => {
    setImageUrl(finishedEvent.currentTarget.result);
  };
  if (photo?.[0]) {
    reader.readAsDataURL(photo?.[0]);
  }

  return (
    <div>
      <h3>edit profile</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          defaultValue={viewer?.displayName}
          name="username"
          label="name"
          variant="outlined"
          inputRef={register({ required: true })}
        />
        <TextField
          type="file"
          name="photo"
          variant="outlined"
          inputRef={register}
        />
        <Button variant="outlined" onClick={handleSubmit(onSubmit)}>
          submit
        </Button>
      </form>

      <img
        src={imageUrl || viewer?.photoURL}
        width={50}
        height={50}
        alt={viewer?.displayName}
      />

      <Divider />

      <Button variant="outlined" onClick={handleLogout}>
        Log out
      </Button>

      <Divider />

      <h3>your nweets</h3>

      {myNweets?.map((nweet) => nweet?.text)}
    </div>
  );
};

export default Profile;
