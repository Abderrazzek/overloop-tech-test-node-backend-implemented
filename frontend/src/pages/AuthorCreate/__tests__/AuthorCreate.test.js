import React from "react";
import { useHistory } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import AuthorCreate from "../AuthorCreate";
import { createAuthor } from "../../../services/authors";
import { ROUTE_AUTHOR_LIST } from "../../../constants";

// Mock the useHistory hook
jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    ...originalModule,
    useHistory: jest.fn(),
  };
});

// Mock the createAuthor function
jest.mock("../../../services/authors", () => ({
  createAuthor: jest.fn(),
}));

describe("AuthorCreate", () => {
  it("should render the create author form", () => {
    render(<AuthorCreate />);

    // Assert that the form elements are rendered
    expect(screen.getByText("Create Author")).toBeInTheDocument();
    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Save Author" })
    ).toBeInTheDocument();
  });

  it("should handle saving an author", async () => {
    const createAuthorMock = createAuthor;
    createAuthorMock.mockResolvedValueOnce();

    const pushMock = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useHistory")
      .mockReturnValue({ push: pushMock });

    render(<AuthorCreate />);

    const firstNameInput = screen.getByLabelText("First Name");
    const lastNameInput = screen.getByLabelText("Last Name");
    const saveButton = screen.getByRole("button", { name: "Save Author" });

    // Enter values in the input fields
    userEvent.type(firstNameInput, "John");
    userEvent.type(lastNameInput, "Doe");

    // Click the save button
    fireEvent.click(saveButton);

    // Wait for the next tick of the event loop
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Assert that createAuthor was called with the correct payload
    expect(createAuthorMock).toHaveBeenCalled();
    expect(createAuthorMock).toHaveBeenCalledWith({
      firstName: "John",
      lastName: "Doe",
    });

    // Assert that useHistory.push was called with the correct route
    expect(pushMock).toHaveBeenCalledWith(ROUTE_AUTHOR_LIST);
  });

  it("should handle field validation errors", async () => {
    render(<AuthorCreate />);

    const saveButton = screen.getByRole("button", { name: "Save Author" });

    // Click the save button without entering any values
    fireEvent.click(saveButton);

    // Assert that validation errors are displayed
    expect(screen.getByText("First name is required.")).toBeInTheDocument();
    expect(screen.getByText("Last name is required.")).toBeInTheDocument();
  });

  it("should handle canceling", () => {
    const pushMock = jest.fn();
    useHistory.mockReturnValue({ push: pushMock });

    render(<AuthorCreate />);

    const cancelButton = screen.getByRole("button", { name: "Cancel" });

    // Click the cancel button
    fireEvent.click(cancelButton);

    // Assert that useHistory.push was called with the correct route
    expect(pushMock).toHaveBeenCalledWith(ROUTE_AUTHOR_LIST);
  });
});
