import { FlatList, StyleSheet, View } from "react-native";
import ListItem from "./ListItem";
import { GRAY } from "@/constants/Colors";
import PropTypes from "prop-types";

const Separator = () => {
  return <View style={styles.separator}></View>;
};

// type TodoItem = {
//   id: string; // 또는 number, 실제 데이터 타입에 맞게 변경
//   [key: string]: any; // 추가적인 필드들
// };

// type Props = {
//   data: TodoItem[]; // TodoItem 타입 배열로 정의
//   setIsBottom: (isBottom: boolean) => void;
//   onDelete: (id: string) => void; // onDelete 함수 정의
//   onToggle: (id: string) => void; // onToggle 함수 정의
// };

type Props = {
  data: string[];
  setIsBottom: boolean;
  onDelete: () => void;
  onToggle: () => void;
};

// setIsBottom을 isEnd로 바꿨었는데 언제 또 다시 setIsBottom으로 바꾸셨는지...????

const List = ({ data, setIsBottom, onDelete, onToggle }: Props) => {
  //data를 받아온다~
  return (
    <FlatList
      onScroll={({
        nativeEvent: { contentOffset, layoutMeasurement, contentSize },
      }) => {
        const distance =
          contentSize.height - (contentOffset.y + layoutMeasurement.height);
        setIsBottom(!(distance > 20 || contentOffset.y === 0));
      }}
      windowSize={3}
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ListItem item={item} onDelete={onDelete} onToggle={onToggle} />
      )}
      ItemSeparatorComponent={Separator}
    />
  );
};

//속성
List.propTypes = {
  data: PropTypes.array.isRequired,
  setIsBottom: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
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
