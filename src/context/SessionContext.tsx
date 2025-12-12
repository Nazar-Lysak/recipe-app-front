import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { getProfileData } from "../shared/api/get-data";

const STORAGE_KEYS = {
  TOKEN: "recipeApp_token",
} as const;

interface User {
  id: string;
  email: string;
  username: string;
}

interface FullUserData {
  profile: {
    id: string;
    email: string;
    username: string;
  };
}

interface SessionContextType {
  loggedIn: boolean;
  user: User | null;
  fullUserData: FullUserData | null;
  token: string | null;
  isLoading: boolean;
  signIn: (userData: User, token: string) => void;
  signOut: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within SessionProvider");
  }
  return context;
};

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [fullUserData, setFullUserData] = useState<FullUserData | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getFullUserData = useCallback(async (userToken: string) => {
    setIsLoading(true);
    try {
      const data = await getProfileData(userToken);
      setFullUserData(data);
    } catch (error) {
      console.error("Failed to load profile:", error);
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      setLoggedIn(false);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);

    if (storedToken) {
      setToken(storedToken);
      setLoggedIn(true);
      getFullUserData(storedToken);
    } else {
      setIsLoading(false);
    }
  }, [getFullUserData]);

  const signIn = useCallback(
    (userData: User, userToken: string) => {
      setLoggedIn(true);
      setUser(userData);
      setToken(userToken);
      localStorage.setItem(STORAGE_KEYS.TOKEN, userToken);
      getFullUserData(userToken);
    },
    [getFullUserData],
  );

  const signOut = useCallback(() => {
    setLoggedIn(false);
    setUser(null);
    setToken(null);
    setFullUserData(null);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  }, []);

  return (
    <SessionContext.Provider
      value={{
        loggedIn,
        user,
        fullUserData,
        token,
        isLoading,
        signIn,
        signOut,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
