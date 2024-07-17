import { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BLACK, DANGER, GRAY, PRIMARY } from "@/constants/Colors";

const ListItem = memo(({ item, onDelete, onToggle }: any) => {
  const checkboxProps = {
    name: item.isDone ? "checkbox-marked" : "checkbox-blank-outline",
    size: 24,
    color: item.isDone ? PRIMARY.DEFAULT : BLACK,
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => onToggle(item.id)} hitSlop={10}>
        <MaterialCommunityIcons {...checkboxProps} />
      </Pressable>

      <View style={styles.task}>
        <Text
          style={
            item.isDone && {
              color: GRAY.DEFAULT,
              textDecorationLine: "line-through",
              textDecorationColor: BLACK,
            }
          }
        >
          {item.task}
        </Text>
      </View>
      <Pressable onPress={() => onDelete(item.id)} hitSlop={10}>
        <MaterialCommunityIcons
          name="trash-can"
          size={20}
          color={DANGER.DEFAULT}
        />
      </Pressable>
    </View>
  );
});

ListItem.displayName = "ListItem";

ListItem.propTypes = {
  item: PropTypes.object.isRequired, // 항목들이 3가지가 들어가서 object
  onDelete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: "row", // 방향 지정, row는 가로정렬
    alignItems: "center", //세로 가운데 정렬
  },
  task: {
    marginHorizontal: 10, // 아래쪽 flex 없을때는 이걸로 간격 조절 가능
    flex: 1, // 휴지통 오른쪽 끝에 가서 붙게 됨 / text view 영역으로 묶고 스타일 적용
  },
});

export default ListItem;
