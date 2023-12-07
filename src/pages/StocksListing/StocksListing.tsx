import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";

import { useGetStocks } from "../../hooks/stocks";

import StockCard from "../../components/StockCard";
import GridList from "../../components/GridList";
import SearchBar from "../../components/SearchBar";
import colors from "../../constants/colors";

export default function StocksListing() {
  const [stocks, setStocks] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, isFetching, isSuccess, hasNextPage, fetchNextPage } =
    useGetStocks(searchQuery);

  useEffect(() => {
    isSuccess &&
      setStocks((prev) => [
        ...prev,
        ...data?.pages?.[data?.pages?.length - 1]?.results,
      ]);
  }, [data?.pages?.length]);

  useEffect(() => {
    setStocks([]);
  }, [searchQuery]);

  const loadNextPageData = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <SearchBar onSubmit={setSearchQuery} />
      </View>
      {(isLoading || isFetching) && !data?.pages?.[0]?.results?.length ? (
        <ActivityIndicator
          size="large"
          color={colors?.white}
          style={styles.commonContainer}
        />
      ) : isSuccess ? (
        <View style={styles.commonContainer}>
          <GridList
            data={stocks}
            numColumns={2}
            renderItem={(item, margin) => (
              <StockCard
                ticker={item.ticker}
                name={item.name}
                margin={margin}
              />
            )}
            onEndReached={loadNextPageData}
          />
          {isLoading || isFetching ? (
            <ActivityIndicator
              size="large"
              color={colors?.white}
              style={{ paddingBottom: 12 }}
            />
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: colors?.appBackground,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 18,
    paddingTop: 16,
    paddingBottom: 0,
  },
  searchBarContainer: {
    width: "100%",
    marginBottom: 8,
  },
  commonContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
