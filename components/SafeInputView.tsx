import { checkPropTypes } from "prop-types";
import PropTypes from "prop-types";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";

type Prop = {
  children: React.ReactNode; // 모든 element요소들을 포함한다
};

const SafeInputView = ({ children }: Prop) => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({ ios: "padding" })} // ios 유저들. input창 눌렀을때 화면이 같이 위로 올라감
    >
      <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
        {children}
      </Pressable>
    </KeyboardAvoidingView>
  );
};

SafeInputView.propTypes = {
  children: PropTypes.node,
};

export default SafeInputView;
