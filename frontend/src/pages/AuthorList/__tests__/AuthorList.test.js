import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

import AuthorList from "../AuthorList";
import { listAuthors } from "../../../services/authors";

jest.mock("../../../services/authors", () => ({
  listAuthors: jest.fn(),
}));

describe("AuthorList", () => {
  const mockAuthors = [
    { id: "author1", firstName: "John", lastName: "Doe" },
    { id: "author2", firstName: "Jane", lastName: "Smith" },
  ];

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should render the author list with correct data", async () => {
    listAuthors.mockResolvedValueOnce(mockAuthors);

    await act(async () => {
      render(
        <MemoryRouter>
          <AuthorList />
        </MemoryRouter>
      );
    });

    mockAuthors.forEach((author) => {
      const authorLink = screen.getByText(
        `${author.firstName} ${author.lastName}`
      );
      expect(authorLink).toBeInTheDocument();
      expect(authorLink.getAttribute("href")).toBe(`/authors/${author.id}`);
    });
  });

  it("should display an error message when fetching authors fails", async () => {
    const errorMessage = "Failed to fetch authors";
    const error = new Error(errorMessage);
    jest.spyOn(console, "error").mockImplementation();

    listAuthors.mockImplementationOnce(() => {
      throw error;
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <AuthorList />
        </MemoryRouter>
      );
    });

    expect(console.error).toHaveBeenCalledWith(
      "Failed to fetch authors",
      error
    );
  });
});
