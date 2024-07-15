import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SignInScreen from "@/screens/SignInScreen";
import ListScreen from "@/screens/ListScreen";
import { GRAY, PRIMARY, WHITE } from "@/constants/Colors";

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{
          contentStyle: { backgroundColor: WHITE },
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{
            contentStyle: { backgroundColor: "lavender", borderRadius: 50 },
          }}
        />
        <Stack.Screen
          name="List"
          component={ListScreen}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
