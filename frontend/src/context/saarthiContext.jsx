import { createContext ,useState, useContext } from "react";


export const SaarthiDataContext = createContext();

const SaarthiContext = ({children}) => {

    const [saarthi,setSaarthi] = useState(null);
    const [ isLoading , setIsLoading ] = useState(false);
    const [ error , setError ] = useState(null);

    const updateSaarthi = async (newSaarthi) => {
        setIsLoading(true);
        try {
            setSaarthi(newSaarthi);
        } catch (error) {
            setError(error);
        }
        setIsLoading(false);
    }

    const value = {
        saarthi,
        setSaarthi,
        updateSaarthi,
        isLoading,
        setIsLoading,
        error,
        setError
    }

    return <div>
        <SaarthiDataContext.Provider value={{ saarthi, setSaarthi }}>
            {children}
        </SaarthiDataContext.Provider>
    </div>;
    }

export default SaarthiContext;