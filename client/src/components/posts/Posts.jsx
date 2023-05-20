import Post from "../post/Post";
import "./posts.scss"
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useState,useEffect } from "react";

const Posts = ({userId}) => {
  const [posts, setPosts] = useState([]); 


  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const res = await makeRequest.get(`/posts?userId=` + userId);
  //     setPosts(res.data);
  //   };
  //   fetchPosts();
  // }, [userId]);

  const { isLoading, error, data } = useQuery(['posts', userId], () =>
    makeRequest.get("/posts?userId=" + userId).then((res) => {
      return res.data;
    })
  );

  return (
    <div className="posts">
      {
        data?.map(post => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  )
}

export default Posts