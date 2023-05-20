import "./post.scss"
import { Link } from "react-router-dom"
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { lazy, Suspense, useContext, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import moment from "moment";
const Comments = lazy(() => import("../comments/Comments.jsx"));


const Post = ({ post }) => {
    const [commentOpen, setCommentOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const { currentUser } = useContext(AuthContext);

    const { isLoading, error, data } = useQuery(["likes", post.id], () =>
        makeRequest.get("/likes?postId=" + post.id).then((res) => {
            return res.data;
        })
    );

    const { isLoading: cIsLoading, data: commentsData } = useQuery(["comments", post.id], () =>
        makeRequest.get("comments?postId=" + post.id).then((res) => {
            return res.data;
        })
    );



    const queryClient = useQueryClient();

    const mutation = useMutation(
        (liked) => {
            if (liked) return makeRequest.delete("/likes?postId=" + post.id);
            return makeRequest.post("/likes", { postId: post.id });
        },
        {
            onSuccess: () => {
                // Invalidate and refresh
                queryClient.invalidateQueries(["likes"]);
            }
        }
    )


    const deleteMutation = useMutation(
        (postId) => {
            return makeRequest.delete("/posts/" + postId);
        },
        {
            onSuccess: () => {
                // Invalidate and refresh
                queryClient.invalidateQueries(["posts"]);
            }
        }
    )


    const handleLike = (e) => {
        e.preventDefault();
        mutation.mutate(data.includes(currentUser.id));
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setConfirmDelete(false);
        setMenuOpen(false);
      }

    const handleDelete = (e) => {
        e.preventDefault();
        if (confirmDelete) {
            deleteMutation.mutate(post.id)
        } else {
            setConfirmDelete(true);
        }

    }

    return (
        <div className="post">
            <div className="container">
                <div className="user">
                    <div className="userInfo">
                        <img src={"/upload/" + post.profilePic} alt="" />
                        <div className="details">
                            <Link
                                to={`/profile/${post.userId}`}
                                style={{ textDecoration: "none", color: "inherit" }}>
                                <span className="name">{post.name}</span>
                            </Link>
                            <span className="date">{moment(post.createdAt).fromNow()}</span>
                        </div>
                    </div>
                    <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
                    {menuOpen && post.userId === currentUser.id &&
                        (confirmDelete ?
                            <div className="confirm">
                                <span >Are you sure you want to delete this post?</span>
                                <div className="buttons">
                                <button className="confirmBtn" onClick={handleDelete}>delete</button>
                                <button className="cancelBtn" onClick={handleCancel}>cancel</button>
                                </div>
                            </div> :
                            (<button onClick={handleDelete}>delete</button>)
                        )
                    }
                </div>
                <div className="content">
                    <p>{post.desc}</p>
                    <img src={"./upload/" + post.img} alt="" />
                </div>
                <div className="info">
                    <div className="item">
                        {isLoading ? (
                            "loading"
                        ) :
                            data.includes(currentUser.id) ? <FavoriteOutlinedIcon style={{ color: "red" }} onClick={handleLike} />
                                : <FavoriteBorderOutlinedIcon onClick={handleLike} />}
                        {data?.length} Likes
                    </div>

                    <div className="item" onClick={() => setCommentOpen(!commentOpen)}>

                        <TextsmsOutlinedIcon />
                        {commentsData?.length} Comments
                    </div>
                </div>
                {commentOpen && <Suspense fallback={<div>loading...</div>}><Comments postId={post.id} /></Suspense>}
            </div>
        </div>
    )
}

export default Post