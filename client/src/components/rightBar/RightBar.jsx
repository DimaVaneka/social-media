import "./rightBar.scss"
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";
import Friend from "../friend/Friend";



const RightBar = () => {

  const { currentUser } = useContext(AuthContext);
  const userId = currentUser.id;
  

  const { isLoading, error, data } = useQuery(["friends",], () =>
    makeRequest.get("/friends/" + userId).then((res) => {
      return res.data;
    })
  );

  return (
    <div className="rightBar">
      {isLoading ? "loading" :
        <div className="container">
          <div className="item">
            <span>My Friends</span>
            {data.map((user) =>
            <Friend user={user} key={user.name}/>
            )}
          </div>
        </div>
      }
    </div>
  )
}

export default RightBar