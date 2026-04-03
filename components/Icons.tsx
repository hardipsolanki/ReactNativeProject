import Svg, { Circle, Path } from "react-native-svg"

// 1. User Icon
export const UserIcon = ({ size = 22, color = "#888" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"
            fill={color}
        />
    </Svg>
)

// 2. Email Icon
export const EmailIcon = ({ size = 22, color = "#888" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
            fill={color}
        />
    </Svg>
)

// 3. Password / Lock Icon
export const PasswordIcon = ({ size = 22, color = "#888" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M18 8h-1V6c0-2.8-2.2-5-5-5S7 3.2 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.7 1.4-3.1 3.1-3.1 1.7 0 3.1 1.4 3.1 3.1v2z"
            fill={color}
        />
    </Svg>
)

// 4. Eye Icon (Show Password)
export const EyeIcon = ({ size = 22, color = "#888" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
            fill={color}
        />
    </Svg>
)

// 5. Eye Off Icon (Hide Password)
export const EyeOffIcon = ({ size = 22, color = "#888" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"
            fill={color}
        />
    </Svg>
)


export const GoogleIcon = ({ size = 22, color = "#fff" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24">
        <Circle cx="12" cy="12" r="12" fill="#007bff" />
        <Path
            d="M21.35 11.1H12v2.8h5.35c-.23 1.4-1.7 4.1-5.35 4.1-3.22 0-5.85-2.67-5.85-5.95s2.63-5.95 5.85-5.95c1.83 0 3.05.78 3.75 1.45l2.55-2.48C16.95 3.6 14.7 2.5 12 2.5 6.9 2.5 2.8 6.6 2.8 12s4.1 9.5 9.2 9.5c5.3 0 8.8-3.7 8.8-8.9 0-.6-.05-1.05-.15-1.5z"
            fill={color}
        />
    </Svg>
);

export const FacebookIcon = ({ size = 22, color = "#fff" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24">
        <Circle cx="12" cy="12" r="12" fill="#007bff" />
        <Path
            d="M13.5 8H15V5.5h-1.5c-2 0-3.5 1.5-3.5 3.5V11H8v2.5h2V20h2.5v-6.5H15L15.5 11h-3V9c0-.6.4-1 1-1z"
            fill={color}
        />
    </Svg>
);

export const XIcon = ({ size = 22, color = "#fff" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24">
        <Circle cx="12" cy="12" r="12" fill="#007bff" />
        <Path
            d="M16.5 7h-1.8l-2.2 2.9L10.2 7H7.5l3.7 5.1L7.3 17h1.8l2.5-3.3 2.4 3.3h2.7l-3.9-5.3L16.5 7z"
            fill={color}
        />
    </Svg>
);
