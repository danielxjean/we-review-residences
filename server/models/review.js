import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
	title: {
		type: String,
		required: 'A Title is required'
	},
	review: {
		type: String,
		required: 'Review is required'
	},
	fromDate: {
		type: Date,
        required: 'The from date is required'
    },
	toDate: {
		type: Date,
		required: 'The to date is required'
	},
    author: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    residence: {
        type: Schema.ObjectId,
        ref: 'Residence'
    },
	rating: {
		type: Number,
		default: 5
	},
	createdDate: { 
		type: Date, 
		required: true, 
		default: Date.now 
	},
});

export default mongoose.model('Review', reviewSchema);