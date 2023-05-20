import express from "express";
import { getRelationships, addRelationship, deleteRealationship} from "../controllers/relationship.js";

const router = express.Router();

router.get("/", getRelationships);
router.post("/", addRelationship);
router.delete("/", deleteRealationship);


export default router