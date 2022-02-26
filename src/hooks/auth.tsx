import { createContext, ReactNode, useContext, useState } from "react";
import { api } from "../services/api";

interface IUser {
  id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
}

interface IAuthState {
  token: string;
  user: IUser;
}

interface ISignInCredentials {
  email: string;
  password: string;
}

interface IAuthContextData {
  user: IUser;
  signIn: (credentials: ISignInCredentials) => Promise<void>;
}

interface IAuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

function AuthProvider({ children }: IAuthProviderProps) {
  const [data, setData] = useState<IAuthState>({} as IAuthState);

  async function signIn({ email, password }: ISignInCredentials) {
    const response = await api.post("/sessions", {
      email,
      password,
    });

    const { token, user } = response.data;

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    setData({ token, user });
  }

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
