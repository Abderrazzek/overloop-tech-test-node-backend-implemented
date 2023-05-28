import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import AuthorDropdown from "../AuthorDropdown";
import { listAuthors } from "../../../services/authors";
import { AUTHOR_DEFAULT_VALUE } from "../../../constants";

// Mock the listAuthors function from "../../../services/authors"
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
  beforeEach(async () => {
    await act(async () => {
      render(
        <AuthorDropdown
          id="author-dropdown"
          value={AUTHOR_DEFAULT_VALUE}
          onChange={() => {}}
        />
      );
    });
  });

  it("renders the component with the specified ID", () => {
    const authorDropdown = screen.getByTestId("author-dropdown");
    expect(authorDropdown).toBeInTheDocument();
  });

  it("fetches authors and renders them in the DropdownList component", async () => {
    await act(async () => {
      await screen.findByText(/No Author Selected/i);
      const authorOption = screen.getByText(/No Author Selected/i);
      expect(authorOption).toBeInTheDocument();
    });
  });

  it("displays an error message if fetching authors fails", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    jest.spyOn(
      listAuthors,
      "mockRejectedValueOnce"
    )(new Error("Failed to fetch authors"));

    await act(async () => {
      render(
        <AuthorDropdown
          id="author-dropdown"
          value={AUTHOR_DEFAULT_VALUE}
          onChange={() => {}}
        />
      );

      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Failed to fetch authors",
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });

  it("calls the onChange callback with the default author value when clear button is clicked", async () => {
    const onChange = jest.fn();

    await act(async () => {
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
});
