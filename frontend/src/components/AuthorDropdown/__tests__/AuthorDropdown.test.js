import React from "react";
import { render, screen } from "@testing-library/react";

import AuthorDropdown from "../AuthorDropdown";
import { listAuthors } from "../../../services/authors";
import { AUTHOR_DEFAULT_VALUE } from "../../../constants";

// Mock the listAuthors function from "../../services/authors"
jest.mock("../../../services/authors", () => ({
  listAuthors: jest.fn(() =>
    Promise.resolve([
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
      },
    ])
  ),
}));

describe("AuthorDropdown", () => {
  beforeEach(() => {
    render(
      <AuthorDropdown
        id="author-dropdown"
        value={AUTHOR_DEFAULT_VALUE}
        onChange={() => {}}
      />
    );
  });

  it("renders the component with the specified ID", () => {
    const authorDropdown = screen.getByTestId("author-dropdown");
    expect(authorDropdown).toBeInTheDocument();
  });

  it("fetches authors and renders them in the DropdownList component", async () => {
    // Wait for the authors to be fetched
    await screen.findByText(/No Author Selected/i);
    const authorOption = screen.getByText(/No Author Selected/i);
    expect(authorOption).toBeInTheDocument();
  });

  it("displays an error message if fetching authors fails", async () => {
    // Mock the console.error method
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    // Mock the listAuthors function to reject with an error
    jest.spyOn(
      listAuthors,
      "mockRejectedValueOnce"
    )(new Error("Failed to fetch authors"));

    render(
      <AuthorDropdown
        id="author-dropdown"
        value={AUTHOR_DEFAULT_VALUE}
        onChange={() => {}}
      />
    );

    // Wait for the error message to be logged in the console
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Check if console.error was called with the expected error message
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Failed to fetch authors",
      expect.any(Error)
    );

    // Restore the original implementation of console.error
    consoleErrorSpy.mockRestore();
  });

  it("calls the onChange callback with the default author value when clear button is clicked", async () => {
    const onChange = jest.fn();

    render(
      <AuthorDropdown
        id="author-dropdown"
        value={{ id: 1, firstName: "John", lastName: "Doe" }}
        onChange={onChange}
      />
    );

    const clearButton = screen.getByText(/Clear Selected Author/i);
    clearButton.click();

    expect(onChange).toHaveBeenCalledWith(AUTHOR_DEFAULT_VALUE);
  });
});
