import Button from "@/components/Button";
import Input, {
  IconNames,
  keyboardTypes,
  ReturnKeyTypes,
} from "@/components/Input";
import SafeInputView from "@/components/SafeInputView";
import { WHITE } from "@/constants/Colors";
import { useEffect, useRef, useState } from "react";
import { Image, Keyboard, StyleSheet, Text, View } from "react-native";

const Index = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const passwordRef = useRef(null);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(!email || !password); // email, password 둘 다 결과값이 false가 되어어야 false가 나옴
  }, [email, password]);

  const onSubmit = async () => {
    try {
      Keyboard.dismiss(); // 키보드 감추기
      const data = await signIn(email, password);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

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
          iconName={IconNames.EMAIL}
          onSubmitEditing={() => passwordRef.current.focus()} // 다음 누르면 password 누르는곳으로 옮겨짐
        />
        <Input
          ref={passwordRef} // 위쪽의 passwordRef를 받는 부분
          title="비밀번호"
          placeholder="비밀번호를 입력하세요"
          keyboardType={keyboardTypes.DEFAULT}
          returnKeyType={ReturnKeyTypes.DONE} // 끝!
          secureTextEntry
          value={password}
          onChangeText={(password: string) => setPassword(password.trim())}
          iconName={IconNames.PASSWORD}
        />
        {/*  로그인 버튼 */}
        <View style={styles.buttonContainer}>
          <Button title="로그인" onPress={onSubmit} disabled={disabled} />
        </View>
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
    maxHeight: 200,
    height: "10%",
    resizeMode: "contain",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 30, // 위쪽여백
    paddingHorizontal: 20, // 가로 여백 , 다른 줄에 다 20으로 줬기 때문
  },
});

export default Index;
