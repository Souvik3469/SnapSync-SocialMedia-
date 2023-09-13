
import { useContext, useState } from "react";
import "./stories.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Stories = () => {
  const { currentUser } = useContext(AuthContext);

  // State for handling new story data
  const [newStory, setNewStory] = useState({
    desc: "",
    file: null,
  });

  // Upload function for uploading the story image
  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
      throw err; // Rethrow the error to be handled by the mutation
    }
  };

  // Query to fetch existing stories
  const { isLoading, error, data } = useQuery(["stories"], () =>
    makeRequest.get("/stories").then((res) => {
      return res.data;
    })
  );

  // React Query mutation for adding a new story
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newStoryData) => {
      return makeRequest.post("/stories", newStoryData);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch the stories query
        queryClient.invalidateQueries(["stories"]);
      },
    }
  );

  // Handle the addition of a new story
  const handleClick = async () => {
    try {
      let imgUrl = "";
      if (newStory.file) {
        imgUrl = await upload(newStory.file);
      }
      // Add the new story
      mutation.mutate({
        desc: newStory.desc,
        img: imgUrl,
      });
      // Reset the new story state
      setNewStory({ desc: "", file: null });
    } catch (error) {
      console.error("Error adding story:", error);
    }
  };

  return (
    <div className="stories">
      <div className="story">
        <img src={"/upload/" + currentUser.profilePic} alt="" />
        <input
  type="file"
  id="file"
  style={{ display: "none" }}
  onChange={(e) => setNewStory({ ...newStory, file: e.target.files[0] })}
/>
        {newStory.file && (
          <img className="file" alt="" src={URL.createObjectURL(newStory.file)} />
        )}
        <input
          type="file"
          id="file"
          style={{ display: "none" }}
          onChange={(e) => setNewStory({ ...newStory, file: e.target.files[0] })}
        />
        <label htmlFor="file">
          <div className="item">
            <img src={Image} alt="" />
            <button onClick={handleClick}>+</button>
            <span>Add Story</span>
            
          </div>
        </label>
       
      </div>
      {error ? `Error: ${error.message}` : isLoading ? "Loading" : (
        data.map((story) => (
          console.log("Story:",story.img),
          <div className="story" >
            <img src={"/upload/"+story.img} alt="" />
            <span>{story.name}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default Stories;