// app/src/components/arnie.tsx

// Import deps
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Import components
import { ArniaList } from './arnia-list';

// Import styles
import './../../styles/apiario.css';

// Create Arnie component
export const Arnie = () => {
	// Prepare states
	const [name, setName] = useState('');
	const [location_id, setLocationId] = useState('');
	const [arnia, setArnia] = useState([]);
	const [loading, setLoading] = useState(true);

	// Fetch all books on initial render
	useEffect(() => {
		fetchArnia();
	}, []);

	// Fetch all books
	const fetchArnia = async () => {
		// Send GET request to 'apiari/arnie/:arnia' endpoint
		console.log('qui %o');
		setLoading(true);
		axios
			.get('http://localhost:4001/apiari/arnie?arnia=')
			.then((response) => {
				// Update the books state
				console.log(response);
				setArnia(response.data);

				// Update loading state
				setLoading(false);
			})
			.catch((error) =>
				console.error(
					`There was an error retrieving the arnie list: ${error}`
				)
			);
	};

	// Reset all input fields
	const handleInputsReset = () => {
		setName('');
		setLocationId('');
	};

	// Create new arnie
	const handleArniaCreate = () => {
		// Send POST request to 'books/create' endpoint
		axios
			.post('http://localhost:4001/apiari/arnie/create', {
				name: name,
				location_id: location_id,
			})
			.then((res) => {
				console.log(res.data);

				// Fetch all Apirai to refresh
				// the Apiari on the Apiario list
				fetchArnia();
			})
			.catch((error) =>
				console.error(
					`There was an error creating the ${name} arnia: ${error}`
				)
			);
	};

	// Submit new book
	const handleArniaSubmit = () => {
		// Check if all fields are filled
		if (name.length > 0 && location_id.length > 0) {
			// Create new book
			handleArniaCreate();

			console.info(`Arnia ${name} by ${location_id} added.`);

			// Reset all input fields
			handleInputsReset();
		}
	};

	// Remove book
	const handleArnieRemove = (id: number, title: string) => {
		// Send PUT request to 'apiario/delete' endpoint
		axios
			.put('http://localhost:4001/apiari/arnie/delete', { id: id })
			.then(() => {
				console.log(`Arnia ${name} removed.`);

				// Fetch all books to refresh
				// the books on the bookshelf list
				fetchArnia();
			})
			.catch((error) =>
				console.error(
					`There was an error removing the ${name} apiario: ${error}`
				)
			);
	};

	// Reset book list (remove all books)
	const handleListReset = () => {
		// Send PUT request to 'books/reset' endpoint
		axios
			.put('http://localhost:4001/arnie/reset')
			.then(() => {
				// Fetch all books to refresh
				// the books on the bookshelf list
				fetchArnia();
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
				<div className="form-wrapper" onSubmit={handleArniaSubmit}>
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
							<label className="form-label" htmlFor="location_id">
								Scegliere Luogo:
							</label>
							<input
								className="form-input"
								type="text"
								id="location_id"
								name="location_id"
								value={location_id}
								onChange={(e) =>
									setLocationId(e.currentTarget.value)
								}
							/>
						</fieldset>
					</div>
				</div>

				<button onClick={handleArniaSubmit} className="btn btn-add">
					Aggiungi un'arnia
				</button>
			</div>

			{/* Render bookshelf list component */}
			<ArniaList
				arnie={arnia}
				loading={loading}
				handleArniaRemove={handleArnieRemove}
			/>

			{/* Show reset button if list contains at least one book */}
			{arnia.length > 0 && (
				<button className="btn btn-reset" onClick={handleListReset}>
					Reset Arnia list.
				</button>
			)}
		</div>
	);
};
