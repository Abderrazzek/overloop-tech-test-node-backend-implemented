import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import { act } from "react-dom/test-utils";

import AuthorEdit from "../AuthorEdit";
import { getAuthor, editAuthor } from "../../../services/authors";

jest.mock("../../../services/authors", () => ({
  getAuthor: jest.fn(),
  editAuthor: jest.fn(),
}));

describe("AuthorEdit", () => {
  const mockAuthor = {
    id: "author-id",
    firstName: "John",
    lastName: "Doe",
  };

  beforeEach(() => {
    jest.resetAllMocks();
    getAuthor.mockResolvedValue(mockAuthor);
  });

  it("should render the edit author form", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={[`/authors/edit/${mockAuthor.id}`]}>
          <Route path="/authors/edit/:authorId">
            <AuthorEdit />
          </Route>
        </MemoryRouter>
      );
    });

    expect(screen.getByText("Edit Author")).toBeInTheDocument();
    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Save Author" })
    ).toBeInTheDocument();
  });

  it("should fetch and populate author data", async () => {
    await act(async () => {
      // Wrap the code in act
      render(
        <MemoryRouter initialEntries={[`/authors/edit/${mockAuthor.id}`]}>
          <Route path="/authors/edit/:authorId">
            <AuthorEdit />
          </Route>
        </MemoryRouter>
      );
    });

    expect(getAuthor).toHaveBeenCalledTimes(1);
    expect(getAuthor).toHaveBeenCalledWith(mockAuthor.id);
    expect(screen.getByLabelText("First Name").value).toBe(
      mockAuthor.firstName
    );
    expect(screen.getByLabelText("Last Name").value).toBe(mockAuthor.lastName);
  });

  it("should handle validation errors when saving an author", async () => {
    await act(async () => {
      // Wrap the code in act
      render(
        <MemoryRouter initialEntries={[`/authors/edit/${mockAuthor.id}`]}>
          <Route path="/authors/edit/:authorId">
            <AuthorEdit />
          </Route>
        </MemoryRouter>
      );

      const saveButton = screen.getByRole("button", { name: "Save Author" });

      fireEvent.click(saveButton);
    });

    expect(editAuthor).not.toHaveBeenCalled();
    expect(screen.getByText("Edit Author")).toBeInTheDocument();
    expect(screen.getByText("First name is required.")).toBeInTheDocument();
    expect(screen.getByText("Last name is required.")).toBeInTheDocument();
  });
});
