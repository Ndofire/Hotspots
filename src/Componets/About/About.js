import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Input, Form, FormGroup, Label } from 'reactstrap';

const About = ({ match }) => {
	useEffect(() => {
		GetAboutData();
	}, []);

	const [
		Itemdata,
		setItemdata
	] = useState({
		title: {},
		location: {},
		description: {},
		dates: {}
	});

	const GetAboutData = async () => {
		const Aboutdata = await fetch(
			`https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=9c348b767f7a0403e907b0788188afba&photo_id=${match
				.params.id}&format=json&nojsoncallback=1`
		);

		const data = await Aboutdata.json();
		setItemdata(data.photo);
	};
	let path = `https://farm${Itemdata.farm}.staticflickr.com/${Itemdata.server}/${Itemdata.id}_${Itemdata.secret}.jpg`;

	// console.log(Itemdata.dates.taken);

	return (
		<div style={{ margin: 'auto', height: '500px', textAlign: 'center' }}>
			<h1 style={{ fontSize: '4vw', fontWeight: '700' }}>{Itemdata.title._content}</h1>
			<img style={{ width: '100%', height: '500px', margin: 'auto' }} src={path} alt="" />
			<p>{Itemdata.description._content}</p>

			<h3>Location:</h3>
			<p>
				latitude: {Itemdata.location.latitude} / longitude: {Itemdata.location.longitude}{' '}
			</p>
			<Link to={`/`}>
				<Button color="primary" className="search-btn w-5" type="submit" value="Search">
					Go Back
				</Button>
			</Link>
		</div>
	);
};

export default About;
