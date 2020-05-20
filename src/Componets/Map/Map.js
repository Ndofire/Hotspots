import React, { useState, useEffect } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

const Map = ({ Locations }) => {
	const [
		selectedLocation,
		setselectedLocation
	] = useState(null);

	return (
		<GoogleMap
			defaultZoom={1}
			defaultCenter={{
				lat: 40.6976,
				lng: -74.259
			}}
		>
			{Locations.Imgdata.map((i, index) => (
				<Marker
					key={index}
					position={{
						lat: parseFloat(i.photo.location.latitude),
						lng: parseFloat(i.photo.location.longitude)
					}}
					onClick={() => {
						setselectedLocation(i);
					}}
				/>
			))}

			{selectedLocation && (
				<InfoWindow
					position={{
						lat: parseFloat(selectedLocation.photo.location.latitude),
						lng: parseFloat(selectedLocation.photo.location.longitude)
					}}
					onCloseClick={() => {
						setselectedLocation(null);
					}}
				>
					<div>
						<p>latitude{selectedLocation.photo.location.latitude}</p>
						<p>longitude {selectedLocation.photo.location.longitude}</p>
					</div>
				</InfoWindow>
			)}
		</GoogleMap>
	);
};

export default withScriptjs(withGoogleMap(Map));
