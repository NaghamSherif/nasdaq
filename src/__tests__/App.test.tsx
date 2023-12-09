import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  render,
  screen,
  waitFor,
  act,
  fireEvent,
} from "@testing-library/react-native";

import GridList from "../components/GridList";
import StockCard from "../components/StockCard";
import StocksListing from "../pages/StocksListing";
import SearchBar from "../components/SearchBar";

import { useGetStocks } from "../hooks/stocks";

jest.mock("../hooks/stocks", () => ({
  useGetStocks: jest.fn(),
}));

const queryClient = new QueryClient();

describe("App test Suite", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("GridList renders the correct data", async () => {
    render(
      <GridList
        data={[
          { ticker: "AAPL", name: "Apple Inc." },
          { ticker: "GOOGL", name: "Alphabet Inc." },
        ]}
        numColumns={2}
        renderItem={(item, margin) => (
          <StockCard ticker={item.ticker} name={item.name} margin={margin} />
        )}
      />
    );
    expect(screen.getByText("AAPL")).toBeTruthy();
  });

  it("renders a loader", async () => {
    (useGetStocks as jest.Mock).mockImplementation(() => ({
      isLoading: true,
    }));

    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <StocksListing />
      </QueryClientProvider>
    );
    await waitFor(() => expect(getByTestId("loader")).toBeTruthy());
  });

  it("renders a list of stocks", async () => {
    const { getByText, rerender } = render(
      <QueryClientProvider client={queryClient}>
        <StocksListing />
      </QueryClientProvider>
    );

    (useGetStocks as jest.Mock).mockImplementation(() => ({
      isSuccess: true,
      data: {
        pages: [
          {
            results: [
              { ticker: "AAPL", name: "Apple Inc." },
              { ticker: "GOOGL", name: "Alphabet Inc." },
            ],
          },
        ],
      },
    }));

    rerender(
      <QueryClientProvider client={queryClient}>
        <StocksListing />
      </QueryClientProvider>
    );

    await act(async () => {
      await waitFor(() => expect(getByText("AAPL")).toBeTruthy());
    });
  });

  it("Search bar works correctly", async () => {
    let mockSubmit = jest.fn();
    const { getByTestId } = render(<SearchBar onSubmit={mockSubmit} />);

    const input = getByTestId("input");
    fireEvent.changeText(input, "micro");
    fireEvent(input, "submitEditing", { nativeEvent: { text: "" } });

    expect(mockSubmit).toHaveBeenCalled();
  });
});
