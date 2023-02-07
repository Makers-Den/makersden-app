import { LinkingOptions, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Linking from "expo-linking";
import { useTheme } from "ui/src/hooks/useTheme";

import { EstimationDetailsScreen } from "./screens/EstimationDetailsScreen";
import { EstimationGateScreen } from "./screens/EstimationGateScreen";
import { RootStackParamList, Screens } from "./types";
import { environment } from "./utils/environment";

const Stack = createNativeStackNavigator<RootStackParamList>();

const prefix = Linking.createURL("/");

export const Navigation = () => {
  const { colors } = useTheme();
  const linking: LinkingOptions<typeof Screens> = {
    prefixes: [prefix, environment.WEB_LINKING_URL],
    config: {
      initialRouteName: Screens.EstimationGate,
      screens: {
        [Screens.EstimationGate]: "",
        [Screens.EstimationDetails]: "estimations/:secret",
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName={Screens.EstimationGate}
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.black[200],
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: "bold",
            color: colors.white,
          },
        }}
      >
        <Stack.Screen
          options={{ title: "Home" }}
          name={Screens.EstimationGate}
          component={EstimationGateScreen}
        />
        <Stack.Screen
          options={{ title: "Details" }}
          name={Screens.EstimationDetails}
          component={EstimationDetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
