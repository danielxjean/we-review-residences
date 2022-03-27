import Review from '../models/review';
import errorHandler from '../helpers/dbErrorHandler';
var ObjectId = require('mongoose').Types.ObjectId; 

export const createReview = (req, res, next) => {
	const review = new Review(req.body);
	review.save((err, result) => {
		if (err) {
			return res.status(400).json({
				error: errorHandler.getErrorMessage(err)
			});
		}
		res.status(200).json({
			message: 'New review was created successfully!'
		});
	});
};

export const findReviews = (req, res, next) => {
	Review.find({}).exec((err, reviews) => {
		if (err || !reviews) {
			return res.status(400).json({
				error: 'No residence found with that id'
			});
		}
		res.send(reviews);
	});
};

// export const findReviewsByResidenceId = (req, res) => {
// 	Review.find({residence: ObjectId(req.params.residenceId)}).exec((err, reviews) => {
// 		if (err || !reviews) {
// 			return res.status(400).json({
// 				error: 'No review found with that id'
// 			});
// 		}
// 		res.status(200).send(reviews); 
// 	});
// };

export const findReviewsByResidenceId = (req, res) => {
	Review.aggregate(
		[
			{ $match: {residence: ObjectId(req.params.residenceId)} },
			{ $lookup: { from: "users", localField: "author", foreignField: "_id", as: "review_author" }},
			{
				$project: {
				  _id: 1,
				  fromDate: 1,
				  rating: 1,
				  review: 1,
				  "review_author.firstName": 1,
				  "review_author.lastName": 1,
				}
			  }
		]
	)
	.exec((err, reviews) => {
		if (err || !reviews) {
			return res.status(400).json({
				error: 'No review found with that id'
			});
		}
		res.status(200).send(reviews); 
	});
};

export const findResidencesWithRatings = (req, res, next) => {
	Review.aggregate(
		[
			{ $match: {} }, 
			{ $group: { _id: "$residence",  "count": { $sum:1 }, rating: {$avg: "$rating" } } },
			{ $lookup: { from: "residences", localField: "_id", foreignField: "_id", as: "residence_detail" } }
		]
	 ).exec( (err, residences) => {
		if (err || !residences) {
			return res.status(400).json({
				error: 'No review found with that id'
			});
		}
		res.status(200).send(residences);
	});
};