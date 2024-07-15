import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";

type Props = {
  canGoBack: boolean;
  tintColor: string;
};

const HeaderRightButton = ({ tintColor }: Props) => {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate("Setting")} hitSlop={10}>
      <MaterialCommunityIcons name="cog" size={30} color={tintColor} />
    </Pressable>
  );
};

HeaderRightButton.PropTypes = {
  tintColor: PropTypes.string,
};

export default HeaderRightButton;
