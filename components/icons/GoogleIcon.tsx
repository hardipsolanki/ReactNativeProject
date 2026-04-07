import Svg, { Circle, Path } from "react-native-svg";

export const GoogleIcon = ({ size = 22, color = "#fff" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx="12" cy="12" r="12" fill="#007bff" />
    <Path
      d="M21.35 11.1H12v2.8h5.35c-.23 1.4-1.7 4.1-5.35 4.1-3.22 0-5.85-2.67-5.85-5.95s2.63-5.95 5.85-5.95c1.83 0 3.05.78 3.75 1.45l2.55-2.48C16.95 3.6 14.7 2.5 12 2.5 6.9 2.5 2.8 6.6 2.8 12s4.1 9.5 9.2 9.5c5.3 0 8.8-3.7 8.8-8.9 0-.6-.05-1.05-.15-1.5z"
      fill={color}
    />
  </Svg>
);
