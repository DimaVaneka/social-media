import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useQuery, useQueryClient, useMutation,queryCache  } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { lazy, Suspense, useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { useState } from "react";
const Posts = lazy(()=> (import("../../components/posts/Posts.jsx")));
const Update = lazy(()=> (import("../../components/update/Update")));

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [profile, setProfile ] = useState({}); 

  const userId = parseInt(useLocation().pathname.split("/")[2]);

  
  const { isLoading, error, data } = useQuery(["user",userId], () =>
  makeRequest.get("/users/find/" + userId).then((res) => {
    return res.data;
  })
);
  
console.log(profile);

  const { isLoading: rIsLoading, data: relationshipData } = useQuery(["relationship"], () =>
  makeRequest.get("/relationships?followedUserId=" + userId).then((res) => {
    return res.data;
  })
);

const queryClient = useQueryClient();

const mutation = useMutation(
    (following) =>{
        if(following) return makeRequest.delete("/relationships?userId=" + userId);
        return makeRequest.post("/relationships",{userId});
    },
    {
        onSuccess : () =>{
            // Invalidate and refresh
            queryClient.invalidateQueries(["relationship"]);
            queryClient.invalidateQueries(["friends"]);

        }
    }
)




const handleFollow = () =>{
    mutation.mutate(relationshipData.includes(currentUser.id))
}


  

  return (
    <div className='profile'>
       {isLoading ? (
        "loading"
      ) : (
        <>
        <div className="images">
          <img src={"/upload/" + data.coverPic} alt="" className="cover" />
          <img src={"/upload/" + data.profilePic} alt="" className="profilePic" />
        </div>
        <div className="profileContainer">
          <div className="uInfo">
            <div className="left">
              <a href="http://facebook.com">
                <FacebookTwoToneIcon fontSize="large" />
              </a>
              <a href="http://facebook.com">
                <InstagramIcon fontSize="large" />
              </a>
              <a href="http://facebook.com">
                <TwitterIcon fontSize="large" />
              </a>
              <a href="http://facebook.com">
                <LinkedInIcon fontSize="large" />
              </a>
              <a href="http://facebook.com">
                <PinterestIcon fontSize="large" />
              </a>
            </div>
            <div className="center">
              <span>{data.name}</span>
              <div className="info">
                <div className="item">
                  <PlaceIcon />
                  <span>{data?.city}</span>
                </div>
                <div className="item">
                  <LanguageIcon />
                  <span>{data.website}</span>
                </div>
              </div>
              { rIsLoading ? ("loading"): data.id === currentUser.id ? (
                <button onClick={()=>setOpenUpdate(true)}>update</button>
              ) : (
                <button onClick={handleFollow}>{relationshipData.includes(currentUser.id)? "Following" : "Follow"}</button>)}
            </div>
            <div className="right">
              <EmailOutlinedIcon />
              <MoreVertIcon />
            </div>
          </div>
          <Suspense fallback={<div>loading....</div>}><Posts userId = { data.id}/></Suspense>
        </div>
        </>
      )}
      { openUpdate && <Suspense fallback={<div>loading...</div>}><Update setOpenUpdate = {setOpenUpdate} user={profile}/></Suspense>}
    </div>
  )
}

export default Profile