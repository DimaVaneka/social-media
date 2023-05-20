import { db } from "../connect.js";
import jwt from "jsonwebtoken";



export const getFriends = (req, res) => {
    const userId = req.params.userId;
    const q = `SELECT r.followedUserId,friends.profilePic, friends.name FROM social.users AS u JOIN relationships AS r ON(u.id =r.followerUserId ) JOIN users AS friends ON(r.followedUserId= friends.id) WHERE u.id = ?`


    db.query(q, userId, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });

};

export const deleteFriend = (req, res) =>{
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
  
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q = "DELETE FROM relationships WHERE `followerUserId`=? AND `followedUserId` = ?";
  
  
      db.query(q, [ userInfo.id, req.params.userId], (err, data) => {
        if (err) return res.status(500).json(err);
        if(data.affectedRows>0) return res.status(200).json("User has been deleted");
        return res.status(403).json("You can delete only your friend.");
      })
    })
  }