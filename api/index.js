import express from "express";
const app = express();
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import commentRoutes from "./routes/comments.js"
import likeRoutes from "./routes/likes.js"
import cookieParser from "cookie-parser";
import cors from "cors";



//middleweares
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials", true);
    next();
})
app.use(express.json());
app.use(cors(
    {
        origin:"http://localhost:3000",
    }
));
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/post",postRoutes);
app.use("/api/users",commentRoutes);
app.use("/api/comments",likeRoutes);


app.listen(8800, ()=>{
    console.log("API working!")
});

