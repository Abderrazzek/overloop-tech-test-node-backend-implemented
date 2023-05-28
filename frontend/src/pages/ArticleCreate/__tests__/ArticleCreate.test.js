import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";

import ArticleCreate from "../ArticleCreate";
import { createArticle } from "../../../services/articles";
import { ROUTE_ARTICLE_LIST } from "../../../constants";

jest.mock("../../../services/articles", () => ({
  createArticle: jest.fn(),
}));

describe("ArticleCreate", () => {
  beforeEach(() => {
    createArticle.mockClear();
  });

  it("renders the form and handles saving", async () => {
    const history = createMemoryHistory();

    render(
      <MemoryRouter history={history}>
        <ArticleCreate />
      </MemoryRouter>
    );

    // Fill in the form fields
    const titleInput = screen.getByLabelText("Title");
    fireEvent.change(titleInput, { target: { value: "Test Title" } });

    const contentInput = screen.getByLabelText("Content");
    fireEvent.change(contentInput, { target: { value: "Test Content" } });

    // Submit the form
    const saveButton = screen.getByText("Save Article");
    fireEvent.click(saveButton);

    // Check if the createArticle function is called
    expect(createArticle).toHaveBeenCalledTimes(1);
    expect(createArticle).toHaveBeenCalledWith({
      title: "Test Title",
      content: "Test Content",
      authorId: null,
      regions: [],
    });

    // Simulate a successful article creation
    createArticle.mockResolvedValueOnce();

    // Poll for the redirection to happen
    const maxPollAttempts = 10;
    let pollAttempts = 0;

    const pollInterval = setInterval(() => {
      pollAttempts++;

      if (pollAttempts > maxPollAttempts) {
        clearInterval(pollInterval);
        throw new Error(
          "Redirection to article list did not occur within the timeout."
        );
      }

      if (history.location.pathname === ROUTE_ARTICLE_LIST) {
        clearInterval(pollInterval);
        // Assertion: Check if the user is redirected to the article list
        expect(history.location.pathname).toBe(ROUTE_ARTICLE_LIST);
      }
    }, 100);
  });

  it("displays error messages for empty fields", async () => {
    render(
      <MemoryRouter>
        <ArticleCreate />
      </MemoryRouter>
    );

    // Submit the form without filling in the fields
    const saveButton = screen.getByText("Save Article");
    fireEvent.click(saveButton);

    // Check if the error messages are displayed
    expect(screen.getByText("Title is required.")).toBeInTheDocument();
    expect(screen.getByText("Content is required.")).toBeInTheDocument();

    // Check if the createArticle function is not called
    expect(createArticle).not.toHaveBeenCalled();
  });

  it("handles cancellation and redirects to the article list", () => {
    const history = createMemoryHistory();

    render(
      <MemoryRouter history={history}>
        <ArticleCreate />
      </MemoryRouter>
    );

    // Click the cancel button
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    // Delay before checking the location.pathname
    setTimeout(() => {
      // Check if the user is redirected to the article list
      expect(history.location.pathname).toBe(ROUTE_ARTICLE_LIST);
    }, 100); // Adjust the delay time as needed
  });
});
