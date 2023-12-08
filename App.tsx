import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import StocksListing from "./src/pages/StocksListing";
import Header from "./src/components/Header";
import colors from "./src/constants/colors";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <SafeAreaView style={styles?.container}>
      <StatusBar barStyle="light-content" />
      <QueryClientProvider client={queryClient}>
        <Header />
        <StocksListing />
      </QueryClientProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.darkNavy,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});
