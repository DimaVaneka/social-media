import express from "express";
import {getFriends,deleteFriend } from "../controllers/friend.js";

const router = express.Router();

router.get("/:userId", getFriends);
router.delete("/:userId", deleteFriend);


export default router