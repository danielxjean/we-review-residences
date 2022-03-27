import express from 'express';

// import them to protect routes
import { 
    findResidences,
    findResidenceById,
    createResidence,
} from '../controllers/residence';

const router = express.Router();

router.get("/api/residence", findResidences);

router.get("/api/residence/:id", findResidenceById);

router.post("/api/residence/createResidence", createResidence);

export default router;