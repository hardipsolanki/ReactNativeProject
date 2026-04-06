import { createContext, useCallback, useMemo, useState } from "react";
import { UserContext } from "./UserContext";

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{
    id: string;
    fullName: string;
    email: string;
  } | null>(null);

 
  const contextValue = useMemo(() => ({ user, setUser }), [user]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default AppProvider;
