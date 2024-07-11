import { StyleSheet, Text, TextInput, View } from "react-native";
import PropTypes from "prop-types"; // 자동추가가 안돼서 적어주는게 나음
import { BLACK, GRAY, PRIMARY } from "@/constants/Colors";
import { forwardRef, useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // expo의 vector icon 삽입. 직접 입력해줘야함

type Props = {
  //type 지정
  title: string;
  placeholder: string;
  keyboardType: any;
  returnKeyType: any;
  secureTextEntry?: boolean; // 속성이 들어갈수도 있고 아닐수도 있다. ?가 그 역할. 속성 들어가면 불리언으로 처리
  iconName: string; //
  // value: any;
  value: string; //선생님
  // onChangeText: any;
  onChangeText: (str: string) => void; //선생님
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
  SEND: "send",
};

export const IconNames = {
  EMAIL: "email", // 뒤에나오는 이름은 icon의 이름-사이트 들어가면 나오는 아이콘 이름. 대소문자 구별함
  PASSWORD: "lock",
};

const Input = forwardRef(
  ({ title, placeholder, value, iconName, ...props }: Props, ref) => {
    // 전개표현식은 맨 끝에
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isValue, setIsValue] = useState(false);

    useEffect(() => {
      if (value) {
        setIsValue(true);
      } else {
        setIsValue(false);
      }
    }, [value]);

    return (
      <View style={styles.container}>
        <Text
          style={[
            styles.title,
            isValue && styles.hasValueTitle,
            isFocused && styles.focusedTitle,
          ]} // styles.title은 기본값. hasValueTitle은 값이 들어갔을때. focusedTitle은 포커스 맞춰졌을때. 순서 중요!
        >
          {title}
        </Text>
        <TextInput
          {...props}
          ref={ref}
          value={value}
          style={[
            styles.input,
            isValue && styles.hasValueInput,
            isFocused && styles.focusedInput,
          ]}
          placeholder={placeholder ?? title}
          placeholderTextColor={GRAY.DEFAULT} // Colors.ts 파일, 색상 따로따로 안줘도 됨~
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="none"
          keyboardAppearance="light"
          onFocus={() => setIsFocused(true)} // input안에 focus
          onBlur={() => setIsFocused(false)} // focus되었다가 풀릴때
        />
        <View style={styles.icon}>
          <MaterialCommunityIcons
            name={iconName}
            size={20}
            color={(() => {
              switch (true) {
                case isFocused:
                  return PRIMARY.DEFAULT;
                case !!isValue:
                  return BLACK;
                default:
                  return GRAY.DEFAULT;
              }
            })()}
          />
        </View>
      </View>
    );
  }
);

Input.defaultProps = {
  keyboardType: keyboardTypes.DEFAULT,
  returnKeyType: ReturnKeyTypes.DONE, // 위쪽의 {props}가 이거들을 나타냄
};

Input.propTypes = {
  title: PropTypes.string.isRequired, // title은 필수
  placeholder: PropTypes.string,
  value: PropTypes.string,
  IconName: PropTypes.oneOf(Object.values(IconNames)), // 둘중에 하나 선택이라 oneOf
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
    paddingLeft: 30, // 아래쪽 icon에서 간격을 줬기 때문에 여기서도 여백줘야함. 안그러면 겹침
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
  icon: {
    position: "absolute", // position 겹치기 때문에
    left: 28, // absolute가 들어갔기때문에 위치값 지정해줘야함 , icon 위치 조절
    top: 12, // icon 위치 조절
    height: "100%",
    justifyContent: "center", // 가운데 정렬
  },
});

export default Input;
