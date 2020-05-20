import React, { useEffect, useState } from 'react';
import Map from '../Map/Map';
import List from '../List/List';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Input, Form, FormGroup, Label } from 'reactstrap';

const Home = () => {
	const [
		Locations,
		setLocations
	] = useState([]);

	const [
		GoeLocationlng,
		setGoeLocationlng
	] = useState('');
	const [
		GoeLocationlat,
		setGoeLocationlat
	] = useState('');

	const [
		Rawdata,
		setRawdata
	] = useState([]);

	const [
		Imgdata,
		setImgdata
	] = useState([]);

	const [
		search,
		setSearch
	] = useState('');

	const [
		query,
		setQuery
	] = useState('Rocks');

	useEffect(
		() => {
			getAddress();
		},
		[
			query
		]
	);

	const updateSearch = (event) => {
		setSearch(event.target.value);
	};

	const getSearch = (event) => {
		event.preventDefault();
		setQuery(search);
		setSearch('');
	};

	async function getAddress() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				if (position.coords.latitude !== '' && position.coords.longitude !== '') {
					setGoeLocationlat(position.coords.latitude.toFixed(4));
					setGoeLocationlng(position.coords.longitude.toFixed(4));
					example(position.coords.longitude.toFixed(4), position.coords.latitude.toFixed(4))
						.then((i) => {
							setLocations(i.dataset1.photos.photo);
							setImgdata(i.dataset2);
							setRawdata(i);
						})
						.catch((err) => {
							console.log(err);
						});
				}
			}, showError);
		} else {
			alert('Geolocation is not supported by this browser.');
		}
	}

	const showError = (error) => {
		switch (error.code) {
			case error.PERMISSION_DENIED:
				errorheandly();
				break;
			case error.POSITION_UNAVAILABLE:
				errorheandly();
				break;
			case error.TIMEOUT:
				errorheandly();
				break;
			case error.UNKNOWN_ERROR:
				errorheandly();
				break;
		}
	};

	const errorheandly = () => {
		setGoeLocationlat(-74.259);
		setGoeLocationlng(40.697);
		example(-74.259, 40.6971494)
			.then((i) => {
				setLocations(i.dataset1.photos.photo);
				setImgdata(i.dataset2);
				setRawdata(i);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	async function example(lon, lat) {
		let response1 = await fetch(
			`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=9c348b767f7a0403e907b0788188afba&text=${query}&accuracy=+11&has_geo=1&geo_context=1&lat=${lat}&lon=${lon}&radius=10&radius_units=km&extras=description%2C+license%2C+date_upload%2C+date_taken%2C+owner_name%2C+icon_server%2C+original_format%2C+last_update%2C+geo%2C+tags%2C+machine_tags%2C+o_dims%2C+views%2C+media%2C+path_alias%2C+url_sq%2C+url_t%2C+url_s%2C+url_q%2C+url_m%2C+url_n%2C+url_z%2C+url_c%2C+url_l%2C+url_o&per_page=20&page=1&format=json&nojsoncallback=1`
		);
		let json = await response1.json();
		console.log(json);
		const promises = json.photos.photo.map((i) =>
			fetch(
				`https://www.flickr.com/services/rest/?method=flickr.photos.geo.getLocation&api_key=9c348b767f7a0403e907b0788188afba&photo_id=${i.id}&format=json&nojsoncallback=1`
			)
		);

		const response2 = await Promise.all(promises);
		const json2 = await Promise.all(response2.map((res) => res.json()));

		return {
			dataset1: json,
			dataset2: json2
		};
	}

	return (
		<div className="container">
			<Map
				googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyA8i9z0T-J6oIs6Rrb7FUqz0rM1jipwrEg&v=3.exp&libraries=geometry,drawing,places`}
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `400px` }} />}
				mapElement={<div style={{ height: `100%` }} />}
				Locations={{ Imgdata }}
			/>
			<Form className="mt-2" onSubmit={getSearch}>
				<FormGroup>
					<Label for="exampleEmail">Search For A Place</Label>
					<Input className="search-bar" type="text" placeholder="School" onChange={updateSearch} />
				</FormGroup>
				<Button color="primary" className="search-btn w-5" type="submit" value="Search">
					Search
				</Button>
			</Form>
			{Locations.map((location) => (
				<List
					key={location.id}
					title={location.title}
					farm={location.farm}
					server={location.server}
					id={location.id}
					secret={location.secret}
				/>
			))}
		</div>
	);
};
export default Home;
