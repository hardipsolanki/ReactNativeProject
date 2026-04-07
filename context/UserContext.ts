import { createContext } from "react";

export const UserContext = createContext<{
    user: {
        id: string;
        fullName: string;
        email: string;
    } | null;
    setUser: React.Dispatch<
        React.SetStateAction<{
            id: string;
            fullName: string;
            email: string;
        } | null>
    >;
}>({
    user: null,
    setUser: () => { },
});