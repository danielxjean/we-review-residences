import Residence from '../models/residence';
import errorHandler from '../helpers/dbErrorHandler';

export const createResidence = (req, res, next) => {
	const residence = new Residence(req.body);
	residence.save((err, result) => {
		if (err) {
			return res.status(400).json({
				error: errorHandler.getErrorMessage(err)
			});
		}
		res.status(200).json({
			message: 'New residence was created successfully!'
		});
	});
};

export const findResidenceById = (req, res, next, id) => {
	Residence.findById(id).exec((err, residence) => {
		if (err || !residence) {
			return res.status(400).json({
				error: 'No residence found with that id'
			});
		}
		req.residence = residence;
		next();
	});
};

export const findResidences = (req, res, next) => {
	Residence.find({}).exec((err, residence) => {
		if (err || !residence) {
			return res.status(400).json({
				error: 'No residences were found'
			});
		}
		res.status(200).json(residence);
		next();
	});
};

// export const deleteResidence = (req, res, next) => {
// 	let user = req.profile;
// 	user.remove((err, deletedUser) => {
// 		if (err) {
// 			return res.status(400).json({
// 				error: errorHandler.getErrorMessage(err)
// 			});
// 		}
// 		deletedUser.hashedPassword = undefined;
// 		user.salt = undefined;
// 		res.json(residence);
// 	});
// };