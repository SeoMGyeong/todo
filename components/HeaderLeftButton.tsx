import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import PropTypes from "prop-types";

type Props = {
  canGoBack: boolean;
  tintColor: string;
};

const HeaderLeftButton = ({ canGoBack, tintColor }: Props) => {
  const navigation = useNavigation();
  if (!canGoBack) return null;
  return (
    <Pressable onPress={navigation.goBack}>
      <MaterialCommunityIcons name="chevron-left" size={30} color={tintColor} />
    </Pressable>
  );
};

HeaderLeftButton.PropTypes = {
  canGoBack: PropTypes.bool,
  tintColor: PropTypes.string,
};

export default HeaderLeftButton;
