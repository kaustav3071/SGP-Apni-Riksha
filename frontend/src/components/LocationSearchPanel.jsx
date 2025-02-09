import React from "react";

const LocationSearchPanel = ({ isVisible, onSelect }) => {
    if (!isVisible) return null; // Hide if not needed

    // Location Recommendations (Now moved here)
    const locationRecommendations = [
        "24B, Near Kapoor's Cafe, Sheryians Coding School, Bhopal",
        "Hostel Block A, Charusat University",
        "New Market, Bhopal",
        "Rajwada Palace, Indore"
    ];

    return (
        <div className="absolute mt-7 left-6 z-50">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Suggested Locations</h2>
            <ul>
                {locationRecommendations.length > 0 ? (
                    locationRecommendations.map((location, index) => (
                        <li 
                            key={index} 
                            className="p-3 bg-green-100 border border-gray-300 shadow-md rounded-md mb-2 cursor-pointer flex items-center gap-2 font-medium hover:bg-gray-200 transition"
                            onClick={() => onSelect(location)}
                        >
                            <img 
                                width="20" 
                                height="20" 
                                src="https://img.icons8.com/ios/50/marker.png" 
                                alt="location-marker" 
                            />
                            <span>{location}</span>
                        </li>
                    ))
                ) : (
                    <li className="text-gray-500">No suggestions available</li>
                )}
            </ul>
        </div>
    );
};

export default LocationSearchPanel;
