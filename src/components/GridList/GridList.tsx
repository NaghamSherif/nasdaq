import { StyleSheet, View, FlatList } from "react-native";

export default function GridList({
  data,
  numColumns,
  renderItem,
  onEndReached = () => {},
}: {
  data: any[];
  numColumns: number;
  renderItem: (
    item: any,
    margin: { marginRight?: number; marginLeft?: number }
  ) => React.JSX.Element;
  onEndReached?: (info: { distanceFromEnd: number }) => void;
}) {
  const formatData = (data: any[], numColumns: number) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }

    return data;
  };

  const renderFunc = ({ item, index }: { item: any; index: number }) => {
    if (item.empty === true) {
      return <View style={styles.itemInvisible} />;
    }
    return renderItem(
      item,
      index % 2 === 0
        ? {
            marginRight: 10,
          }
        : {
            marginLeft: 10,
          }
    );
  };

  return (
    <FlatList
      data={formatData(data, numColumns)}
      style={styles.container}
      renderItem={renderFunc}
      numColumns={numColumns}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      onEndReached={(e) => {
        if (e?.distanceFromEnd === 0) onEndReached(e);
      }}
      onEndReachedThreshold={0.001}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    margin: 0,
    marginTop: 10,
    marginBottom: 0,
    gap: 10,
  },
  itemInvisible: {
    flex: 1,
    backgroundColor: "transparent",
    borderRadius: 18,
    marginBottom: 20,
  },
});
