// app/src/index.tsx

// Import deps
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Logo from './logo.svg';

// Import components
import { Apiario } from './components/Apiario/apiario';
import { Arnie } from './components/Arnie/arnie';

// Import styles
import './styles/styles.css';

// Find div container
const rootElement = document.getElementById('root');

// Render Apiario component in the DOM
render(
	<Router>
		<header className="w-full bg-gray-800 p-4 flex justify-between items-center">
			<nav className="flex items-center">
				<img className="w-7 h-7" src={Logo} alt="" />
				<div className="text-white text-xs hidden sm:block ml-2">
					<a
						href="/"
						className="bg-gray-900 hover:bg-gray-700 p-2 rounded cursor-pointer">
						Dashboard
					</a>
					<a
						href="/"
						className="bg-gray-900 hover:bg-gray-700 p-2 rounded cursor-pointer ml-1">
						Projects
					</a>
					<a
						href="/"
						className="bg-gray-900 hover:bg-gray-700 p-2 rounded cursor-pointer ml-1">
						Issues
					</a>
					<a
						href="/"
						className="bg-gray-900 hover:bg-gray-700 p-2 rounded cursor-pointer ml-1">
						Boards
					</a>
				</div>
			</nav>
			<div className="w-8 h-8 cursor-pointer"></div>
		</header>

		<main className="flex w-full h-screen">
			<aside className="w-80 h-screen bg-gray shadow-md w-fulll hidden sm:block">
				<div className="flex flex-col justify-between h-screen p-4 bg-gray-800">
					<div className="text-sm">
						<div className="bg-gray-900 text-white p-5 rounded cursor-pointer">
							<Link to="/">Home</Link>
						</div>
						<div className="bg-gray-700 text-blue-300 p-2 rounded mt-2 cursor-pointer">
							<Link to="/apiari">Apiari</Link>
						</div>
						<div className="bg-gray-900 flex justify-between items-center text-white p-2 rounded mt-2 cursor-pointer hover:bg-gray-700 hover:text-blue-300">
							<Link to="/apiari">
								<span>Arnie</span>
								<span className="w-4 h-4 bg-blue-600 rounded-full text-white text-center font-normal text-xs">
									5
								</span>
							</Link>
						</div>
					</div>
				</div>
			</aside>

			<section className="w-full p-4">
				<div className="w-full h-64 border-dashed border-4 p-4 text-md">
					<Switch>
						<Route
							path="/apiari/arnie?arnia=:arnia"
							component={Arnie}></Route>
						<Route path="/">
							<Apiario />
						</Route>
					</Switch>
				</div>
			</section>
		</main>
	</Router>,
	rootElement
);
