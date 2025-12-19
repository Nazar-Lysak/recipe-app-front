import { useState, useEffect, useCallback, type ReactNode } from "react";
import { getProfileData, getCurrentUser } from "../shared/api/get-data";
import type {
  FullUserDataInterface,
  UserInterface,
} from "../shared/types/UI.types";
import { SessionContext } from "./useSession";
import i18n from "../i18n";

const LOCAL_STORAGE_KEYS = {
  TOKEN: "recipeApp_token",
} as const;

export function SessionProvider({ children }: { children: ReactNode }) {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<UserInterface | null>(null);
  const [fullUserData, setFullUserData] =
    useState<FullUserDataInterface | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getFullUserData = useCallback(async (userToken: string) => {
    setIsLoading(true);
    try {
      const data = await getProfileData(userToken);
      setFullUserData(data);
      i18n.changeLanguage(data.language || "en");
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

  const refreshUserData = useCallback(async () => {
    const currentToken =
      token || localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
    if (currentToken) {
      await getFullUserData(currentToken);
    }
  }, [token, getFullUserData]);

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
        refreshUserData,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
