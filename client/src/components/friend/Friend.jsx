import "./friend.scss"
import React from 'react';
import { Link } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Friend = ({user}) => {

  const queryClient = useQueryClient();

  const deleteMutation = useMutation(
    (id) => {
        return makeRequest.delete("/friends/" + id);
    },
    {
        onSuccess: () => {
            // Invalidate and refresh
            queryClient.invalidateQueries(["friends"]);
            queryClient.invalidateQueries(["relationship"]);

        }
    }
)
  

const handleDelete = () => {
  deleteMutation.mutate(user.followedUserId);
}

  return (
    <div className="friend">
      <div className="userInfo">
        <img src={"/upload/" + user.profilePic} alt="" />
        <Link className="link" to={"/profile/" + user.followedUserId}>
          <span>{user.name}</span>
        </Link>
      </div>
      <div className="buttons">
        <button onClick={handleDelete}>dismiss</button>
      </div>
    </div>
  )
}

export default Friend
