import Svg, { Circle, Path } from "react-native-svg";

export const FacebookIcon = ({ size = 22, color = "#fff" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx="12" cy="12" r="12" fill="#007bff" />
    <Path
      d="M13.5 8H15V5.5h-1.5c-2 0-3.5 1.5-3.5 3.5V11H8v2.5h2V20h2.5v-6.5H15L15.5 11h-3V9c0-.6.4-1 1-1z"
      fill={color}
    />
  </Svg>
);
