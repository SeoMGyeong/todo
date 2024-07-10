import Input, { keyboardTypes, ReturnKeyTypes } from "@/components/Input";
import SafeInputView from "@/components/SafeInputView";
import { WHITE } from "@/constants/Colors";
import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const Index = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  console.log(email, password);

  return (
    <SafeInputView>
      <View style={styles.container}>
        <Image
          source={require("../assets/images/main.png")}
          style={styles.image}
        />
        <Text>SignIn</Text>
        <Input
          title="이메일"
          placeholder="your@email.com"
          keyboardType={keyboardTypes.EMAIL}
          returnKeyType={ReturnKeyTypes.NEXT} // 다음 항목으로 이동
          value={email}
          onChangeText={(email: string) => setEmail(email.trim())}
        />
        <Input
          title="비밀번호"
          placeholder="비밀번호를 입력하세요"
          keyboardType={keyboardTypes.DEFAULT}
          returnKeyType={ReturnKeyTypes.DONE} // 끝!
          secureTextEntry
          value={password}
          onChangeText={(password: string) => setPassword(password.trim())}
        />
      </View>
    </SafeInputView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: WHITE,
  },
  image: {
    width: 300,
    height: 300,
  },
});

export default Index;
