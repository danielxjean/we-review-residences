import express from 'express';

// import them to protect routes
import { 
    findReviewsByResidenceId,
    findReviews,
    createReview,
    findResidencesWithRatings
} from '../controllers/review';

// import them to protect routes
import { requireSignin, hasAuthorization } from '../controllers/auth';

const router = express.Router();

router.get("/api/review", findReviews)

router.get(`/api/review/:residenceId`, findReviewsByResidenceId)

router.post("/api/review/createReview", createReview);

router.get("/api/residencewithreviews", findResidencesWithRatings);

export default router;