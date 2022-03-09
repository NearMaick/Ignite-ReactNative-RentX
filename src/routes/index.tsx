import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LoadAnimation } from "../components/LoadAnimation";
import { useAuth } from "../hooks/auth";
import { AppTabRoutes } from "./app.tab.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
  const { user, loading } = useAuth();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {loading ? (
        <LoadAnimation />
      ) : (
        <NavigationContainer>
          {user.id ? <AppTabRoutes /> : <AuthRoutes />}
        </NavigationContainer>
      )}
    </GestureHandlerRootView>
  );
}
