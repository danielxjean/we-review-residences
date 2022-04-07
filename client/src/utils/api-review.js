export const registerReview = review => {
	return fetch('/api/review/createReview', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(review)
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

export const findReviewsByResidenceId = (residenceId) => {
	return fetch('/api/review/' + residenceId + '/', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		}
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.error(err));
};

export const findResidencesWithReviews = () => {
	return fetch('/api/residencewithreviews/', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		}
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.error(err));
}

// export const deleteReview = (params, credentials) => {
// 	return fetch('/api/reviews/' + params.userId, {
// 		method: 'DELETE',
// 		headers: {
// 			Accept: 'application/json',
// 			'Content-Type': 'application/json',
// 			Authorization: 'Bearer ' + credentials.t
// 		}
// 	})
// 		.then(response => {
// 			return response.json();
// 		})
// 		.catch(err => console.error(err));
// };