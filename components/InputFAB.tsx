import { BLACK, PRIMARY, WHITE } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  useWindowDimensions,
} from "react-native";
import PropTypes from "prop-types";

const BOTTOM = 30;
const BUTTON_WIDTH = 60;
const RIGHT = 10;

// 선생님 isBtm isBottom으로 바꾸셨나...
const InputFAB = ({ onInsert, isBtm }) => {
  const onPressInsert = () => {
    const task = text.trim();
    if (task) {
      onInsert(task);
      close();
    }
  };
  const [text, setText] = useState("");
  const [isOpend, setIsOpend] = useState(false);
  const inputRef = useRef(); // 참조값 그대로 유지하는 Hook
  const windowWidth = useWindowDimensions().width; // width값만 가져옴, 가로폭 크기 조절
  const [keyboardHeight, setKeyboardHeight] = useState(BOTTOM); // 기존값 BOTTOM을 기준으로 삼음, 초기값 30이라는 말~

  const buttonRotation = useRef(new Animated.Value(0)).current;
  const inputWidth = useRef(new Animated.Value(BUTTON_WIDTH)).current;
  const buttonRight = useRef(new Animated.Value(RIGHT)).current;

  useEffect(() => {
    if (Platform.OS === "ios") {
      const show = Keyboard.addListener("keyboardWillShow", (e) => {
        setKeyboardHeight(e.endCoordinates.height + BOTTOM);
      }); // 키보드가 보여질때 +BOTTOM, 키보드 높이에 + 30을 해서 보이도록 만든것
      const hide = Keyboard.addListener("keyboardWillHide", () => {
        setKeyboardHeight(BOTTOM);
      }); // 키보드가 숨겨질때
      return () => {
        show.remove();
        hide.remove();
      };
    }
  }, []);

  const open = () => {
    setIsOpend(true);
    Animated.timing(inputWidth, {
      toValue: windowWidth - 20,
      useNativeDriver: false,
      duration: 300,
    }).start(() => {
      inputRef.current.focus();
    });
    Animated.spring(buttonRotation, {
      toValue: 1,
      useNativeDriver: false,
      bounciness: 20,
    }).start();
  }; // 애니메이션이 먹히긴 하는데... 한번 먹히고 끝인듯??

  const close = () => {
    if (isOpend) {
      setText("");
      setIsOpend(false);
      Animated.timing(inputWidth, {
        toValue: BUTTON_WIDTH,
        useNativeDriver: false,
        duration: 300,
      }).start(() => {
        inputRef.current.blur();
      });
      Animated.spring(buttonRotation, {
        toValue: 0,
        useNativeDriver: false,
        bounciness: 20,
      }).start();
    }
  };

  const spin = buttonRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "315deg"],
  });

  const onPressButton = () => {
    isOpend ? onPressInsert() : open();
  };

  useEffect(() => {
    Animated.timing(buttonRight, {
      toValue: isBtm ? RIGHT - BUTTON_WIDTH : RIGHT,
      useNativeDriver: false,
    }).start();
  }, [buttonRight, isBtm]);

  return (
    <>
      <Animated.View
        style={[
          styles.position,
          styles.button,
          styles.shape,
          {
            justifyContent: "center",
            bottom: keyboardHeight,
            right: buttonRight,
            position: "absolute",
          }, // justifyContent 가운데정렬
          isOpend && { width: inputWidth }, // 눌렀을때 크기 커졌다 작아졌다
        ]}
      >
        <TextInput
          onSubmitEditing={onPressInsert}
          ref={inputRef}
          style={styles.input}
          value={text}
          onChangeText={(text) => setText(text)}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="none"
          keyboardAppearance="light"
          returnKeyType="done"
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.position,
          styles.shape,
          {
            right: buttonRight,
            position: "absolute",
            bottom: keyboardHeight,
            transform: [{ rotate: spin }],
          },
        ]}
      >
        <Pressable
          onPress={onPressButton} //onPress안에 들어가는 함수는 우리 맘대로 이름 짓기
          style={({ pressed }) => [
            styles.button,
            styles.shadow,
            pressed && {
              backgroundColor: PRIMARY.DARK,
              //         bottom: keyboardHeight, 이거 있으면 눌렀을때 둥둥 뜸
            },
          ]}
        >
          <MaterialCommunityIcons name="plus" size={24} color={WHITE} />
        </Pressable>
      </Animated.View>
    </>
  );
};

InputFAB.propTypes = {
  onInsert: PropTypes.func.isRequired,
  isBtm: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60, // 원래 50인가 60이었음
    borderRadius: 30,
    justifyContent: "center", // 아이콘 위치값 가운데정렬
    alignItems: "center", // 아이콘 위치값 가운데정렬
    backgroundColor: PRIMARY.DEFAULT,
  },
  position: {
    // button style과 position, bottom, right 동일
    position: "absolute",
    bottom: BOTTOM, // 30
    right: RIGHT, // 10
  },
  shape: {
    height: BUTTON_WIDTH, //button의 height와 높이 같게 하기. 안그러면 살짝 튀어나와있음
    width: BUTTON_WIDTH,
    borderRadius: BUTTON_WIDTH / 2, // 반지름 15, /2하면 원모양 됨
    backgroundColor: PRIMARY.DEFAULT,
  },
  input: {
    color: WHITE,
    paddingLeft: 20, // 반지름 15라서 5정도의 여유를 둠
    paddingRight: BUTTON_WIDTH + 10, // 왜 70이냐. button의 가로크기가 60이기때문에 10만큼 더 떨어트림
  },
  shadow: {
    shadowColor: BLACK,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.5, // 투명도 50%
        shadowRadius: 5,
      },
      android: { elevation: 5 },
    }),
  },
});

export default InputFAB;
