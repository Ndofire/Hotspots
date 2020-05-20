import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const List = ({ farm, secret, server, id, title, address }) => {
	let path = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;

	return (
		<div style={{ width: '250px', float: 'left', margin: '1rem', height: '250px' }}>
			<Link to={`${id}`}>
				<p>{address}</p>
				<img style={{ width: '100%', height: '250px' }} src={path} alt="" />
				<h1 style={{ fontSize: '1vw' }}>{title}</h1>
			</Link>
		</div>
	);
};

export default List;
