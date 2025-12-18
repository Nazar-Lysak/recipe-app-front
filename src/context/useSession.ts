import { useContext, createContext } from "react";
import type {
  FullUserDataInterface,
  UserInterface,
} from "../shared/types/UI.types";

interface SessionContextType {
  loggedIn: boolean;
  user: UserInterface | null;
  fullUserData: FullUserDataInterface | null;
  token: string | null;
  isLoading: boolean;
  signIn: (userData: UserInterface, token: string) => void;
  signOut: () => void;
}

export const SessionContext = createContext<SessionContextType | undefined>(
  undefined,
);

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within SessionProvider");
  }
  return context;
}
