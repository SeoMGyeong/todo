import { StyleSheet, Text, View } from "react-native";

const SettingScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30 }}>Setting Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // 가운데 정렬 시키기 위한 3가지.
  },
});

export default SettingScreen;
