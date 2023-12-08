import { StyleSheet, Text, View } from "react-native";

import colors from "../../constants/colors";

export default function StockCard({
  ticker,
  name,
  margin,
}: {
  ticker: string;
  name: string;
  margin: { marginRight?: number; marginLeft?: number };
}) {
  return (
    <View style={[styles.container, margin]}>
      <View style={styles?.logo}>
        <Text style={styles?.logoAlt}>AA</Text>
      </View>
      <Text style={styles?.ticker}>{ticker}</Text>
      <Text numberOfLines={1} style={styles?.name}>
        {name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.navy,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    marginBottom: 20,
    aspectRatio: 1,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors?.cardBorder,
  },
  logo: {
    height: 35,
    width: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors?.cardBorder,
    padding: 5,
    marginBottom: 20,
  },
  logoAlt: {
    color: colors?.grayText,
    fontSize: 14,
  },
  ticker: {
    fontWeight: "600",
    fontSize: 16,
    color: colors?.lightText,
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    color: colors?.grayText,
    textAlign: "center",
    maxWidth: "80%",
    overflow: "hidden",
  },
});
