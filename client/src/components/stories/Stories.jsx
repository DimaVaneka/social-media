import { useContext, useState } from "react";
import "./stories.scss";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { AuthContext } from "../../context/authContext";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { Link } from "react-router-dom";
import moment from "moment";

const Stories = () => {
  const [file, setFile] = useState(null);

  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["stories"], () =>
    makeRequest.get("/stories").then((res) => {
      return res.data;
    })
  );

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data
    } catch (err) {
      console.log(err);
    }
  }

  const queryClient = useQueryClient();

  const mutation = useMutation((newStory) => {
    return makeRequest.post("/stories", newStory);
  },
    {
      onSuccess: () => {

        queryClient.invalidateQueries(["stories"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload();
    mutation.mutate({ img: imgUrl });
    setFile(null);
  }


  return (
    <div className="stories">
      <div className="story">
        {file ?
          <img className="file" alt="" src={URL.createObjectURL(file)} /> :
          <img src={"/upload/" + currentUser.profilePic} alt="" />}
        <span>{currentUser.name}</span>
        <input type="file" id="file2" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
        <label htmlFor="file2">
          {file ? <span className="button" onClick={handleClick}><SendRoundedIcon /></span> : <span className="button">+</span>}
        </label>
      </div>
      {error
        ? "Something went wrong"
        : isLoading
          ? "loading"
          : data.map((story) => (
            <div className="story" key={story.id}>
              <span className="date">{moment(story.createdAt).fromNow(true)}</span>
              <img src={"/upload/" + story.img} alt="" />
              <Link to={"/profile/" + story.userId}><span>{story.name}</span></Link>
            </div>
          ))}
    </div>
  );
};

export default Stories;