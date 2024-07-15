import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import SignInScreen from "@/screens/SignInScreen";
import ListScreen from "@/screens/ListScreen";
import { GRAY, PRIMARY, WHITE } from "@/constants/Colors";
import { Image, Pressable, Settings, Text } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import HeaderLeftButton from "@/components/HeaderLeftButton";
import HeaderRightButton from "@/components/HeaderRightButton";
import SettingScreen from "@/screens/SettingScreen";

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{
          contentStyle: { backgroundColor: WHITE },
          headerShown: false,
          headerTitleAlign: "center", // 앱 전체에서 가운데 정렬
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
          options={{
            title: "할 일 목록 ",
            headerShown: true,
            headerTintColor: PRIMARY.DEFAULT, //헤더에 있는 모든 색 변경
            headerTitleStyle: {
              // 글자만 변경
              fontWeight: "700",
            },

            headerRight: HeaderRightButton,
            headerLeft: (props) => HeaderLeftButton({ ...props }),

            headerTitle: ({ children }) => {
              return (
                <Pressable onPress={() => console.log("test")}>
                  <Image
                    style={{ height: 40, resizeMode: "contain" }}
                    source={require("../assets/images/react-logo.png")}
                  />
                </Pressable>
              );
            },
          }} // 상단에 페이지 상단바 나옴. 상단바에 "할 일 목록"이라고 뜸. title이 없으면 name이 뜸
        />
        <Stack.Screen
          name="Setting"
          component={SettingScreen}
          options={{
            title: "설정",
            headerShown: true,
            headerTintColor: PRIMARY.DEFAULT, //헤더에 있는 모든 색 변경
            headerTitleStyle: {
              // 글자만 변경
              fontWeight: "700",
            },

            headerLeft: (props) => HeaderLeftButton({ ...props }),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
