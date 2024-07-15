import ListItem from "@/components/ListItem";
import { GRAY } from "@/constants/Colors";
import { FlatList, StyleSheet, View } from "react-native";

const Separator = () => {
  return <View style={styles.separator}></View>;
};

const ListScreen = () => {
  const todos = [
    { id: 1, task: "React Native", isDone: false },
    { id: 2, task: "React Native", isDone: true },
    { id: 3, task: "React Native", isDone: false },
    { id: 4, task: "React Native", isDone: false },
    { id: 4, task: "React Native", isDone: false },
  ];

  return (
    //일부분만 보여주는 기능이 있다~~는걸 알아두기
    <View style={styles.container}>
      <FlatList
        windowSize={3}
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ListItem item={item} />}
        ItemSeparatorComponent={Separator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20, // 첫번째 목록과 title 사이
  },
  separator: {
    height: 1,
    backgroundColor: GRAY.LIGHT,
    marginVertical: 10, // 아래위여백 , 목록 사이의 간격이 된다~~
    marginHorizontal: 10, // 좌우여백
  },
});

export default ListScreen;
