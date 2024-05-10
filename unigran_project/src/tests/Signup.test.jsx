import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Signup from "../pages/Signup";

beforeEach(() => {
  jest.spyOn(global, "fetch").mockResolvedValue({
    json: jest.fn().mockResolvedValue({ id: 123, ok: true }),
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

const mockUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUsedNavigate,
}));

describe("Signup component", () => {
  it("submits the form with valid data", async () => {
    render(<Signup />);

    // Fill in the form fields
    fireEvent.change(
      screen.getByPlaceholderText("Email Address"),

      {
        target: { value: "test@example.com" },
      }
    );
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    // Submit the form
    fireEvent.submit(screen.getByRole("button"));

    // Wait for the API request to resolve
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_URL}/api/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "test@example.com",
            password: "password123",
          }),
        }
      );
    });
  });
});
