import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { Button, TextField, makeStyles } from "@material-ui/core";
import { dbService, storageService } from "fb";

const useStyles = makeStyles({
  field: {
    marginRight: 15,
  },
});

const NweetFactory = ({ viewerId }) => {
  const classes = useStyles();
  const [imageUrl, setImageUrl] = React.useState();

  const { register, handleSubmit, watch, setValue } = useForm();

  const onSubmit = async (data) => {
    let downloadUrl;
    if (imageUrl) {
      const fileRef = storageService.ref().child(`${viewerId}/${uuidv4()}`);
      const res = await fileRef.putString(imageUrl, "data_url");
      downloadUrl = await res.ref.getDownloadURL();
    }

    await dbService.collection("nweets").add({
      text: data?.nweet,
      createdAt: new Date(),
      authorId: viewerId,
      ...(downloadUrl && { photo: downloadUrl }),
    });
  };

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
      {imageUrl && (
        <>
          <img src={imageUrl} width="50px" height="50px" alt="nweet" />
          <Button onClick={handleImageClear}>Clear Photo</Button>
        </>
      )}
      <Button onClick={handleSubmit(onSubmit)} variant="outlined">
        submit
      </Button>
    </form>
  );
};

export default NweetFactory;
