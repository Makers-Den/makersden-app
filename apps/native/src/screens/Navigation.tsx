import { LinkingOptions, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Linking from "expo-linking";
import { GateScreen } from "./GateScreen";
import { DetailsScreen } from "./DetailsScreen";
import { RootStackParamList, Screens } from "../types";
import { useTheme } from "ui/src/hooks/useTheme";
import { environment } from "../utils/environment";
import { LinkScreen } from "./LinkScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const prefix = Linking.createURL("/");

export function Navigation() {
  const { colors } = useTheme();
  const linking: LinkingOptions<typeof Screens> = {
    prefixes: [prefix, environment.WEB_LINKING_URL],
    config: {
      initialRouteName: Screens.Gate,
      screens: {
        [Screens.Gate]: "",
        [Screens.Details]: "estimations/:secret",
        [Screens.Link]: "link",
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName={Screens.Gate}
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
          name={Screens.Gate}
          component={GateScreen}
        />
        <Stack.Screen name={Screens.Details} component={DetailsScreen} />
        <Stack.Screen name={Screens.Link} component={LinkScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
