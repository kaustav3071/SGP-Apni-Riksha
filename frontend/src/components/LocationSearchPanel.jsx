import React, { useState, useEffect } from "react";
import axios from "axios";

const LocationSearchPanel = ({ isVisible, onSelect, searchQuery = "" }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setSuggestions([]);
            return;
        }

        const fetchSuggestions = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                    params: { address: searchQuery },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setSuggestions(response.data.map(item => item.title) || []);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
                setSuggestions([]);
            } finally {
                setLoading(false);
            }
        };

        fetchSuggestions();
    }, [searchQuery]);

    if (!isVisible) return null;

    return (
        <div className="absolute mt-7 left-6 z-50">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Suggested Locations</h2>
            <ul>
                {loading ? (
                    <li className="text-gray-500">Loading suggestions...</li>
                ) : suggestions.length > 0 ? (
                    suggestions.map((location, index) => (
                        <li
                            key={index}
                            className="p-3 bg-green-100 shadow-md rounded-md mb-2 cursor-pointer flex items-center gap-2 font-medium hover:bg-gray-200 transition"
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
