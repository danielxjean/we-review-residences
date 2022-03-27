import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const residenceSchema = new Schema({
	address: {
		type: String,
		trim: true,
		required: 'Address is required'
	},
	description: {
		type: String,
		required: 'Description is required'
	},	
	hostingSince: {
		type: Number,
		trim: true,
		required: 'Hosting since date is required'
	},
	author: {
		type: Schema.ObjectId,
		ref: 'User'
	},
}); 

export default mongoose.model('Residence', residenceSchema);