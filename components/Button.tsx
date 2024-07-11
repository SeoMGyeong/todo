import { Pressable, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import { Colors, PRIMARY, WHITE } from "@/constants/Colors";

type props = {
  title: string;
  onPress: () => void; // 함수형태
  disabled: boolean;
};

const Button = ({ title, onPress, disabled }: props) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && { backgroundColor: PRIMARY.DARK },
        disabled && { backgroundColor: PRIMARY.LIGHT, opacity: 0.6 }, // 이부분 이해가 안되는군.
      ]}
      disabled={disabled}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired, // isRequired 필수항목
  onPress: PropTypes.func.isRequired, // 함수형식
  disabled: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    paddingVertical: 20, // 수직 내부여백
    justifyContent: "center", // 가로정렬
    alignItems: "center", // 세로정렬
    backgroundColor: PRIMARY.DEFAULT, // 배경색이 없어서 안보이는 경우도 있다는것...
  },
  title: {
    color: WHITE,
    fontSize: 16,
    fontWeight: "700", // 700은 bold
  },
});

export default Button;
