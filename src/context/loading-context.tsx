import { createContext, ReactNode, useState } from "react";

interface LoadContextType {
    loadingContext: string;
    setLoadingContext: (data: boolean) => void;
}

const LoadContext = createContext<LoadContextType | undefined>(undefined)

const LoadingProvider: React.FC<{children: ReactNode}> = ({ children  }) => {
    const [loadingContext, setLoadingContext] = useState<any>(false)

    return (
        <LoadContext.Provider value={{ loadingContext, setLoadingContext }}>
            { children }
        </LoadContext.Provider>
    )
}

export { LoadingProvider, LoadContext }