import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";

import ArticleList from "../ArticleList";
import { listArticles } from "../../../services/articles";

jest.mock("../../../services/articles");

describe("ArticleList", () => {
  const mockArticles = [
    {
      id: 1,
      title: "Article 1",
      author: { firstName: "John", lastName: "Doe" },
    },
    {
      id: 2,
      title: "Article 2",
      author: { firstName: "Jane", lastName: "Smith" },
    },
  ];

  beforeEach(() => {
    listArticles.mockResolvedValue(mockArticles);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render article list correctly", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <ArticleList />
        </MemoryRouter>
      );
    });

    expect(screen.getByText("Articles")).toBeInTheDocument();

    mockArticles.forEach((article) => {
      expect(screen.getByText(article.title)).toBeInTheDocument();
      expect(
        screen.getByText(
          `${article.author.firstName} ${article.author.lastName}`
        )
      ).toBeInTheDocument();
    });
  });

  it("should display an error message when fetching articles fails", async () => {
    const errorMessage = "Failed to fetch articles";
    const error = new Error(errorMessage);
    jest.spyOn(console, "error").mockImplementation();

    listArticles.mockRejectedValue(error);

    await act(async () => {
      render(
        <MemoryRouter>
          <ArticleList />
        </MemoryRouter>
      );
    });

    expect(console.error).toHaveBeenCalledWith(
      "Failed to fetch articles",
      error
    );
  });
});
