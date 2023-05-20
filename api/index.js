import express from "express";
const app = express();
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import friendsRoutes from "./routes/friends.js";
import relationshipRoutes from "./routes/relationships.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import storyRoutes from "./routes/stories.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";
import passport from "passport";



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

// app.use(passport.initialize());
// app.use(passport.session());


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/upload');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });
  
const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req,res) =>{
    const file = req.file;
    res.status(200).json(file.filename);
});


app.use("/api/auth",authRoutes);
app.use("/api/posts",postRoutes);
app.use("/api/friends",friendsRoutes);
app.use("/api/stories",storyRoutes);
app.use("/api/users",userRoutes);
app.use("/api/likes",likeRoutes);
app.use("/api/comments",commentRoutes);
app.use("/api/relationships",relationshipRoutes);


app.listen(8800, ()=>{
    console.log("API working!")
});

