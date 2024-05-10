import React from "react";
import { render, screen } from "@testing-library/react";
import Loader from "../components/Loader";
import "@testing-library/jest-dom";

describe("Loader", () => {
  it("renders the loader component with correct props", () => {
    render(<Loader />);

    // Check if the InfinitySpin component is rendered
    const infinitySpinElement = screen.getByTestId("infinity-spin");
    expect(infinitySpinElement).toBeInTheDocument();
  });
});
