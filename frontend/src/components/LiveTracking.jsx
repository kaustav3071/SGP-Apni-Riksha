import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";


const containerStyle = {
    width: "100%",
    height: "475px",
};

const center = {
    lat: -3.745, // Replace with your latitude
    lng: -38.523, // Replace with your longitude
};

const LiveTracking = () => {   
    
    const [currentLocation, setCurrentLocation] = useState(center);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentLocation({ lat: latitude, lng: longitude 

            });
    });
    const  watchId = navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude 

        });
    });

        return () => {
            navigator.geolocation.clearWatch(watchId);
        };
    }, []);

    return (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_MAPS_API_KEY}>
            <GoogleMap mapContainerStyle={containerStyle} center={currentLocation} zoom={15}>
                <Marker position={currentLocation} />
            </GoogleMap>
        </LoadScript>
    );
}




export default LiveTracking;