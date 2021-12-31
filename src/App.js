import React, { useState } from 'react';
import { FaEnvelopeOpen, FaUser, FaCalendarTimes, FaMap, FaPhone, FaLock } from 'react-icons/fa';
import useFetch from './useFetch';

const url = 'https://randomuser.me/api/';
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg';

function App() {
	const { data, loading, error, fetchData } = useFetch(url);
	const [title, setTitle] = useState('name');
	let person;

	function handleMouseEnter(event) {
		if (event.target.classList.contains('icon')) {
			const value = event.target.dataset.label;
			setTitle(value);
		}
	}

	if (data) {
		const obj = data.results[0];
		person = {
			name: `${obj.name.first} ${obj.name.last}`,
			email: obj.email,
			age: obj.dob.age,
			street: `${obj.location.street.number} ${obj.location.street.name}`,
			phone: obj.phone,
			password: obj.login.password,
			image: obj.picture.large,
		};
	}
	return (
		<main>
			<div className='block bcg-black'></div>
			<div className='block'>
				<div className='container'>
					<img src={person?.image || defaultImage} alt='User' className='user-img' />
					<p className='user-title'>My {title} is</p>
					{data && <p className='user-value'>{person[title]}</p>}
					{loading && <p className='user-value'>{loading}</p>}
					{error && <p className='user-value'>{error}</p>}
					<div className='values-list'>
						<button className='icon' data-label='name' onMouseOver={handleMouseEnter}>
							<FaUser />
						</button>
						<button className='icon' data-label='email' onMouseEnter={handleMouseEnter}>
							<FaEnvelopeOpen />
						</button>
						<button className='icon' data-label='age' onMouseEnter={handleMouseEnter}>
							<FaCalendarTimes />
						</button>
						<button className='icon' data-label='street' onMouseEnter={handleMouseEnter}>
							<FaMap />
						</button>
						<button className='icon' data-label='phone' onMouseEnter={handleMouseEnter}>
							<FaPhone />
						</button>
						<button className='icon' data-label='password' onMouseEnter={handleMouseEnter}>
							<FaLock />
						</button>
					</div>
					<button className='btn' onClick={fetchData}>
						{loading && loading}
						{data && 'Random User'}
						{error && 'Retry'}
					</button>
				</div>
			</div>
		</main>
	);
}

export default App;
