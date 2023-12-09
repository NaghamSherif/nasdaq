import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";

import colors from "../../constants/colors";

export default function SearchBar({
  onSubmit,
}: {
  onSubmit: (text: string) => void;
}) {
  const [value, onChange] = useState("");
  return (
    <TextInput
      style={styles.searchBar}
      onChangeText={onChange}
      onSubmitEditing={(e) => {
        onSubmit(e.nativeEvent.text);
      }}
      value={value}
      placeholder="Search for stocks"
      placeholderTextColor={colors?.grayText}
      testID="input"
    />
  );
}

const styles = StyleSheet.create({
  searchBar: {
    width: "100%",
    borderRadius: 100,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors?.cardBorder,
    backgroundColor: colors?.navy,
    padding: 12,
    paddingStart: 16,
    color: colors?.grayText,
  },
});
