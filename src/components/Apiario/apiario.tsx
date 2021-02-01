// app/src/components/apiario.tsx

// Import deps
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

// Import components
import { ApiarioList } from './apiario-list';

// Import styles
import './../../styles/apiario.css';

// Create Apiario component
export const Apiario = () => {
	// Prepare states
	const [name, setName] = useState('');
	const [location, setLocation] = useState('');
	const [lat, setLat] = useState('');
	const [long, setLong] = useState('');
	const [apiari, setApiario] = useState([]);
	const [loading, setLoading] = useState(true);

	const history = useHistory();

	// Fetch all books on initial render
	useEffect(() => {
		fetchApiario();
	}, []);

	// Fetch all books
	const fetchApiario = async () => {
		// Send GET request to 'apiari/all' endpoint
		axios
			.get('http://localhost:4001/apiari/all')
			.then((response) => {
				// Update the books state
				setApiario(response.data);

				// Update loading state
				setLoading(false);
			})
			.catch((error) =>
				console.error(
					`There was an error retrieving the apiario list: ${error}`
				)
			);
	};

	// Reset all input fields
	const handleInputsReset = () => {
		setName('');
		setLocation('');
		setLat('');
		setLong('');
	};

	// Create new book
	const handleApiarioCreate = () => {
		// Send POST request to 'books/create' endpoint
		axios
			.post('http://localhost:4001/apiari/create', {
				name: name,
				location: location,
				lat: lat,
				long: long,
			})
			.then((res) => {
				console.log(res.data);

				// Fetch all Apirai to refresh
				// the Apiari on the Apiario list
				fetchApiario();
			})
			.catch((error) =>
				console.error(
					`There was an error creating the ${name} apiario: ${error}`
				)
			);
	};

	// Submit new book
	const handleApiarioSubmit = () => {
		// Check if all fields are filled
		if (
			name.length > 0 &&
			location.length > 0 &&
			lat.length > 0 &&
			long.length > 0
		) {
			// Create new book
			handleApiarioCreate();

			console.info(`Book ${name} by ${location} added.`);

			// Reset all input fields
			handleInputsReset();
		}
	};

	// Remove book
	const handleApiarioRemove = (id: number, title: string) => {
		// Send PUT request to 'apiario/delete' endpoint
		axios
			.put('http://localhost:4001/apiari/delete', { id: id })
			.then(() => {
				console.log(`Apiario ${name} removed.`);

				// Fetch all books to refresh
				// the books on the bookshelf list
				fetchApiario();
			})
			.catch((error) =>
				console.error(
					`There was an error removing the ${title} apiario: ${error}`
				)
			);
	};

	// Select the arnia to go to
	const HandleApiarioSelect = (id: string, title: string) => {
		// Send GET request to '/arnie' endpoint

		history.push('/apiari/arnie?arnia=' + id);
		// axios
		//   .post('http://localhost:4001/apiari/arnie/all', { id })
		//   .then(() => {
		//     console.log('Apiario ' + title +' select.')
		//   })
		//   .catch(error => console.error(`There was an error entering in the ${title} apiario: ${error}`))
	};

	// Reset book list (remove all books)
	const handleListReset = () => {
		// Send PUT request to 'books/reset' endpoint
		axios
			.put('http://localhost:4001/apiari/reset')
			.then(() => {
				// Fetch all books to refresh
				// the books on the bookshelf list
				fetchApiario();
			})
			.catch((error) =>
				console.error(
					`There was an error resetting the apiario list: ${error}`
				)
			);
	};

	return (
		<div className="apiario-list-wrapper">
			{/* Form for creating new apiario */}
			<div className="apiario-list-form">
				<div className="form-wrapper" onSubmit={handleApiarioSubmit}>
					<div className="form-row">
						<fieldset>
							<label className="form-label" htmlFor="name">
								Inserire nome:
							</label>
							<input
								className="form-input"
								type="text"
								id="name"
								name="name"
								value={name}
								onChange={(e) => setName(e.currentTarget.value)}
							/>
						</fieldset>

						<fieldset>
							<label className="form-label" htmlFor="location">
								Inserire Luogo:
							</label>
							<input
								className="form-input"
								type="text"
								id="location"
								name="location"
								value={location}
								onChange={(e) =>
									setLocation(e.currentTarget.value)
								}
							/>
						</fieldset>
					</div>

					<div className="form-row">
						<fieldset>
							<label className="form-label" htmlFor="lat">
								Inserire Latitudine:
							</label>
							<input
								className="form-input"
								type="text"
								id="lat"
								name="lat"
								value={lat}
								onChange={(e) => setLat(e.currentTarget.value)}
							/>
						</fieldset>

						<fieldset>
							<label className="form-label" htmlFor="long">
								Inserire Longitudine:
							</label>
							<input
								className="form-input"
								type="text"
								id="long"
								name="long"
								value={long}
								onChange={(e) => setLong(e.currentTarget.value)}
							/>
						</fieldset>
					</div>
				</div>

				<button onClick={handleApiarioSubmit} className="btn btn-add">
					Aggiungi un apiario
				</button>
			</div>

			{/* Render bookshelf list component */}
			<ApiarioList
				apiari={apiari}
				loading={loading}
				handleApiarioRemove={handleApiarioRemove}
				HandleApiarioSelect={HandleApiarioSelect}
			/>

			{/* Show reset button if list contains at least one book */}
			{apiari.length > 0 && (
				<button className="btn btn-reset" onClick={handleListReset}>
					Reset Apiario list.
				</button>
			)}
		</div>
	);
};
