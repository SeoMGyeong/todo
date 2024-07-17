import { FlatList, StyleSheet, View } from "react-native";
import ListItem from "./ListItem";
import { GRAY } from "@/constants/Colors";

const Separator = () => {
  return <View style={styles.separator}></View>;
};

type Props = {
  data: string[];
};

const List = ({ data }: Props) => {
  //data를 받아온다~
  return (
    <FlatList
      windowSize={3}
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <ListItem item={item} />}
      ItemSeparatorComponent={Separator}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: GRAY.LIGHT,
    marginVertical: 10, // 아래위여백 , 목록 사이의 간격이 된다~~
    marginHorizontal: 10, // 좌우여백
  },
});

export default List;
