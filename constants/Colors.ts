/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};

export const WHITE = "#FFFFFF";
export const BLACK = "#000000";
export const PRIMARY = {
  // 메인 색상
  DEFAULT: "#2563eb",
};
// 왜 이렇게 넣느냐. 다양하게 색 넣을 예정
export const GRAY = {
  DEFAULT: "#a3a3a3", // 어느부분에 색깔 넣었는지 주석으로 표시하면 찾기 좋음
};
