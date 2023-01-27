import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GateScreen } from "./GateScreen";
import { DetailsScreen } from "./DetailsScreen";
import { RootStackParamList, Screens } from "../types";
import { useTheme } from "ui/src/hooks/useTheme";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Navigation() {
  const { colors } = useTheme();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Screens.Gate}
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.black[200],
          },
          headerTitleStyle: {
            fontWeight: "bold",
            color: colors.white,
          },
        }}
      >
        <Stack.Screen
          options={{ title: "Home" }}
          name={Screens.Gate}
          component={GateScreen}
        />
        <Stack.Screen name={Screens.Details} component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
