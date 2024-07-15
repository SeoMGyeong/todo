import Button from "@/components/Button";
import Input, {
  IconNames,
  KeyboardTypes,
  ReturnKeyTypes,
} from "../components/Input";
import SafeInputView from "@/components/SafeInputView";
import { useEffect, useRef, useState } from "react";
import { Alert, Image, Keyboard, StyleSheet, View } from "react-native";

import PropTypes from "prop-types";
import signIn from "@/app/api/auth";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SignInScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const insets = useSafeAreaInsets();

  //제일 강력한 구문
  useEffect(() => {
    navigation.setOptions({
      constentStyle: { backgroundColor: "red" },
    });
  }, [navigation]);

  useEffect(() => {
    setDisabled(!email || !password);
  }, [email, password]);

  const onSubmit = async () => {
    if (!isLoading && !disabled) {
      try {
        Keyboard.dismiss();
        const data = await signIn(email, password);
        setIsLoading(false);
        navigation.navigate("List");
      } catch (e) {
        Alert.alert("로그인 실패", e, [
          { text: "확인", onPress: () => setIsLoading(false) },
        ]);
      }
      setIsLoading(false);
    }
  };

  return (
    <SafeInputView>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Image
          source={require("../assets/images/main.png")}
          style={styles.image}
        />
        <Input
          title="이메일"
          placeholder="e-mail 주소를 입력하세요"
          keyboardType={KeyboardTypes.EMAIL}
          returnKeyType={ReturnKeyTypes.NEXT}
          value={email}
          onChangeText={(email: string) => setEmail(email.trim())}
          iconName={IconNames.EMAIL}
          onSubmitEditing={() => passwordRef.current.focus()}
        />
        <Input
          ref={passwordRef}
          title="비밀번호"
          placeholder="비밀번호 입력"
          returnKeyType={ReturnKeyTypes.DONE}
          secureTextEntry={true}
          value={password}
          onChangeText={(password: string) => setPassword(password.trim())}
          iconName={IconNames.PASSWORD}
        />

        {/* 로그인버튼 */}
        <View style={styles.buttonContainer}>
          <Button
            title="로그인"
            onPress={onSubmit}
            disabled={disabled}
            isLoading={isLoading}
          />
        </View>
      </View>
    </SafeInputView>
  );
};

SignInScreen.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    maxHeight: 200,
    height: "10%",
    resizeMode: "contain",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 30,
    paddingHorizontal: 20,
  },
});

export default SignInScreen;
