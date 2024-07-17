import EmptyList from "@/components/EmptyList";
import InputFAB from "@/components/InputFAB";
import List from "@/components/List";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ListScreen = () => {
  const bottom = useSafeAreaInsets(); // 안쪽 영역 여백
  const todos = [{ id: 1, task: "리액트 할일 목록 만들기", isDone: false }];

  return (
    // 나 왜 가운데 정렬 안되지...음...
    <View
      style={{
        flex: 1,
        paddingBottom: bottom,
      }}
    >
      {todos.length ? <List data={todos} /> : <EmptyList />}
      <InputFAB />
    </View>
  );
};

export default ListScreen;
