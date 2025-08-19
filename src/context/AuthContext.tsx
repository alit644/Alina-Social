import { createContext} from "react";
interface IAuthContext {
  loading: boolean;
}
export const AuthContext = createContext<IAuthContext | null>(null);

