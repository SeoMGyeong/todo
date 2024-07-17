import { PRIMARY } from "@/constants/Colors";
import { Image, StyleSheet, Text, View } from "react-native";

const EmptyList = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/images/main.png")}
      />
      <Text style={styles.text}>할 일을 추가해주세요</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 18,
    fontWeight: "700",
    color: PRIMARY.DEFAULT,
    marginTop: 10,
  },
});

export default EmptyList;
