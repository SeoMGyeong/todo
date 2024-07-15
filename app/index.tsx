import AuthStack from "@/navigations/AuthStack";
import { NavigationContainer } from "@react-navigation/native";

const Index = () => {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
};

export default Index;
