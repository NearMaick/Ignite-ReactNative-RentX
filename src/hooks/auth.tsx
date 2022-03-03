import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { database } from "../database";
import { api } from "../services/api";
import { User as ModelUser } from "../database/model/User";

interface IUser {
  id: string;
  user_id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
  token: string;
}

interface ISignInCredentials {
  email: string;
  password: string;
}

interface IAuthContextData {
  user: IUser;
  signIn: (credentials: ISignInCredentials) => Promise<void>;
  signOut: () => void;
  updatedUser: (user: IUser) => Promise<void>;
}

interface IAuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

function AuthProvider({ children }: IAuthProviderProps) {
  const [data, setData] = useState<IUser>({} as IUser);

  async function signIn({ email, password }: ISignInCredentials) {
    try {
      const response = await api.post("/sessions", {
        email,
        password,
      });

      const { token, user } = response.data;

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const userCollection = database.get<ModelUser>("users");
      await database.write(async () => {
        await userCollection.create((newUser) => {
          newUser.user_id = user.id;
          newUser.name = user.name;
          newUser.email = user.email;
          newUser.driver_license = user.driver_license;
          newUser.avatar = user.avatar;
          newUser.token = token;
        });
      });

      setData({ ...user, token });
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async function signOut() {
    try {
      const userCollection = database.get<ModelUser>("users");
      await database.write(async () => {
        const userSelected = await userCollection.find(data.id);
        await userSelected.destroyPermanently();
      });

      setData({} as IUser);
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async function loadUserData() {
    const userCollection = database.get<ModelUser>("users");
    const response = await userCollection.query().fetch();

    if (response.length > 0) {
      const userData = response[0]._raw as unknown as IUser;
      api.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
      setData(userData);
    }
  }

  async function updatedUser(user: IUser) {
    try {
      const userCollection = database.get<ModelUser>("users");
      await database.write(async () => {
        const userSelected = await userCollection.find(user.id);
        await userSelected.update((userData) => {
          (userData.name = user.name),
            (userData.driver_license = user.driver_license),
            (userData.avatar = user.avatar);
        });
      });

      setData(user);
    } catch (error) {
      throw new Error(String(error));
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data,
        signIn,
        signOut,
        updatedUser,
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
