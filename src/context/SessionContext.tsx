import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { getProfileData, getCurrentUser } from "../shared/api/get-data";
import type { UserInterface } from "../shared/types/UI.types";

const LOCAL_STORAGE_KEYS = {
  TOKEN: "recipeApp_token",
} as const;

interface SessionContextType {
  loggedIn: boolean;
  user: UserInterface | null;
  fullUserData: UserInterface | null;
  token: string | null;
  isLoading: boolean;
  signIn: (userData: UserInterface, token: string) => void;
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
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<UserInterface | null>(null);
  const [fullUserData, setFullUserData] = useState<UserInterface | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getFullUserData = useCallback(async (userToken: string) => {
    setIsLoading(true);
    try {
      const data = await getProfileData(userToken);
      setFullUserData(data);
    } catch (error) {
      console.error("Failed to load profile:", error);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
      setLoggedIn(false);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchCurrentUser = useCallback(async (userToken: string) => {
    try {
      const userData = await getCurrentUser(userToken);
      setUser(userData);
    } catch (error) {
      console.error("Failed to load user:", error);
    }
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);

    if (storedToken) {
      setToken(storedToken);
      setLoggedIn(true);
      getFullUserData(storedToken);
      fetchCurrentUser(storedToken);
    } else {
      setIsLoading(false);
    }
  }, [getFullUserData, fetchCurrentUser]);

  const signIn = useCallback(
    (_: UserInterface, userToken: string) => {
      setLoggedIn(true);
      setToken(userToken);
      localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, userToken);
      getFullUserData(userToken);
      fetchCurrentUser(userToken);
    },
    [getFullUserData, fetchCurrentUser],
  );


  const signOut = useCallback(() => {
    setLoggedIn(false);
    setUser(null);
    setToken(null);
    setFullUserData(null);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
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
