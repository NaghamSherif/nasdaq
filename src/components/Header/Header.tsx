import React from "react";
import { View, Image, StyleSheet } from "react-native";

import colors from "../../constants/colors";
import HeaderIcon from "../../../assets/header-icon.png";

export default function Header() {
  return (
    <View style={styles.header}>
      <Image source={HeaderIcon} style={styles.logo} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 55,
    backgroundColor: colors?.darkNavy,
    padding: 10,
  },
  logo: {
    width: 120,
    height: 40,
  },
});
