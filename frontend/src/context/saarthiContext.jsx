import { createContext, useState } from "react";

export const SaarthiDataContext = createContext();

const SaarthiContext = ({ children }) => {
    const [saarthi, setSaarthi] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateSaarthi = async (newSaarthi) => {
        setIsLoading(true);
        try {
            setSaarthi(newSaarthi);
        } catch (error) {
            setError(error);
        }
        setIsLoading(false);
    };

    const value = {
        saarthi,
        setSaarthi,
        updateSaarthi,
        isLoading,
        setIsLoading,
        error,
        setError,
    };

    return (
        <SaarthiDataContext.Provider value={value}>
            {children}
        </SaarthiDataContext.Provider>
    );
};

export default SaarthiContext;