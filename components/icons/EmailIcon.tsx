import Svg, { Circle, Path } from "react-native-svg";

// 2. Email Icon
export const EmailIcon = ({ size = 22, color = "#888" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
      fill={color}
    />
  </Svg>
);
