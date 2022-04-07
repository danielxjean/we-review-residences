export const registerResidence = residence => {
	return fetch('/api/residence/createResidence/', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(residence)
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

export const findResidences = () => {
	return fetch('/api/residence/', {
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

export const deleteUser = (params, credentials) => {
	return fetch('/api/reviews/' + params.userId, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + credentials.t
		}
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.error(err));
};