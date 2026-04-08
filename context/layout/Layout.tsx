import { StyleSheet, Text, View } from "react-native";
import React, { JSX } from "react";
type LayoutPageProps = {
  children: React.ReactNode;
};
const Layout: React.FC<LayoutPageProps> = ({ children }) => {
  return (
    <View  style={styles.container}>
      <View>{children}</View>
    </View>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
});
