import Svg, { Circle, Path } from "react-native-svg"

export const XIcon = ({ size = 22, color = "#fff" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24">
        <Circle cx="12" cy="12" r="12" fill="#007bff" />
        <Path
            d="M16.5 7h-1.8l-2.2 2.9L10.2 7H7.5l3.7 5.1L7.3 17h1.8l2.5-3.3 2.4 3.3h2.7l-3.9-5.3L16.5 7z"
            fill={color}
        />
    </Svg>
);
