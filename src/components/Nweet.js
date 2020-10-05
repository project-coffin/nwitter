import React from "react";
import { Button, TextField } from "@material-ui/core";
import { dbService } from "fb";
import { useForm } from "react-hook-form";

const Nweet = ({ nweet, isAuthor }) => {
  const { register, handleSubmit } = useForm();
  const [isEditing, setIsEditing] = React.useState(false);
  const handleDelete = async () => {
    await dbService.doc(`nweets/${nweet?.id}`).delete();
  };
  const handleUpdate = async (data) => {
    setIsEditing((prev) => !prev);
    if (isEditing) {
      await dbService
        .doc(`nweets/${nweet?.id}`)
        .update({ text: data?.newNweet });
    }
  };

  return (
    <div>
      <form>
        {isEditing ? (
          <TextField
            name="newNweet"
            inputRef={register}
            defaultValue={nweet?.text}
          />
        ) : (
          nweet?.text
        )}
        {isAuthor && (
          <>
            <Button onClick={handleDelete}>Delete</Button>
            <Button onClick={handleSubmit(handleUpdate)}>Update</Button>
          </>
        )}
      </form>
    </div>
  );
};

export default Nweet;
