import { StyleSheet, Text, TextInput, View } from "react-native";
import PropTypes from "prop-types"; // 자동추가가 안돼서 적어주는게 나음
import { BLACK, GRAY, PRIMARY } from "@/constants/Colors";
import { useState } from "react";

type Props = {
  //type 지정
  title: string;
  placeholder: string;
  keyboardType: any;
  returnKeyType: any;
  secureTextEntry?: boolean; // 속성이 들어갈수도 있고 아닐수도 있다. ?가 그 역할. 속성 들어가면 불리언으로 처리
  value: string | boolean; // 나는 any로 줬을때 빨간색 안뜸
  onChangeText: any;
};

export const keyboardTypes = {
  DEFAULT: "default", //앞에는 선택항목 이름(우리가 마음대로 정해도 됨) : 뒤에가 실제 값
  EMAIL: "email-address", //email @있음
  URL: "url", // url /나옴
  TELNUMBER: "phone-pad", // phone-pad 숫자만 나옴
};

export const ReturnKeyTypes = {
  DONE: "done",
  NEXT: "next",
};

const Input = ({
  title,
  placeholder,
  keyboardType,
  returnKeyType,
  secureTextEntry,
  value,
  onChangeText,
}: Props) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          value && styles.hasValueTitle,
          isFocused && styles.focusedTitle,
        ]} // styles.title은 기본값. hasValueTitle은 값이 들어갔을때. focusedTitle은 포커스 맞춰졌을때. 순서 중요!
      >
        {title}
      </Text>
      <TextInput
        style={[
          styles.input,
          value && styles.hasValueInput,
          isFocused && styles.focusedInput,
        ]}
        placeholder={placeholder ?? title}
        placeholderTextColor={GRAY.DEFAULT} // Colors.ts 파일, 색상 따로따로 안줘도 됨~
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={keyboardType} // 속성 = {속성}
        returnKeyType={returnKeyType}
        textContentType="none"
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)} // input안에 focus
        onBlur={() => setIsFocused(false)} // focus되었다가 풀릴때
      />
    </View>
  );
};

Input.propTypes = {
  title: PropTypes.string.isRequired, // title은 필수
  placeholder: PropTypes.string,
  keyboardType: PropTypes.oneOf(Object.values(keyboardTypes)), // 여러개중에 한개 선택 가능  , keyboardTypes에서 받아와서 쓸거야
  returnKeyType: PropTypes.oneOf(Object.values(ReturnKeyTypes)),
  secureTextEntry: PropTypes.bool,
}; //input이라는 component의 propTypes은~

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20, // 내부의 가로여백
    marginVertical: 10, // 외부의 세로여백
  },
  title: {
    marginBottom: 4, // 아래쪽 여백
    color: GRAY.DEFAULT,
  },
  focusedTitle: {
    fontWeight: "700",
    color: PRIMARY.DEFAULT,
  },
  hasValueTitle: {
    color: BLACK,
  },
  input: {
    // input기본값
    borderWidth: 1, // 테두리 굵기
    borderRadius: 8, //모서리 둥글기
    borderColor: GRAY.DEFAULT,
    paddingHorizontal: 10,
    height: 42,
  },
  focusedInput: {
    borderWidth: 2,
    borderColor: PRIMARY.DEFAULT,
    color: PRIMARY.DEFAULT,
  },
  hasValueInput: {
    borderColor: BLACK,
    color: BLACK,
  },
});

export default Input;
