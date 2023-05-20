import express from "express";
import { postUpload} from "../controllers/upload";

const router = express.Router();

router.post("/", postUpload);


export default router