import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";

import ArticleEdit from "../ArticleEdit";
import { getArticle } from "../../../services/articles";
import { ROUTE_ARTICLE_PREFIX } from "../../../constants";

jest.mock("../../../services/articles");

describe("ArticleEdit", () => {
  const mockArticleId = "123";
  const mockArticle = {
    id: mockArticleId,
    title: "Mock Title",
    content: "Mock Content",
    author: { id: "456", firstName: "Mock", lastName: "Author" },
    regions: [
      {
        id: 1,
        code: "AU",
        name: "Australia",
      },
      {
        id: 2,
        code: "UK",
        name: "United Kingdom",
      },
      {
        id: 3,
        code: "US",
        name: "United States of America",
      },
    ],
  };

  beforeEach(() => {
    getArticle.mockResolvedValue(mockArticle);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetches the article on mount and pre-fills the form fields", () => {
    render(
      <MemoryRouter
        initialEntries={[`${ROUTE_ARTICLE_PREFIX}/${mockArticleId}`]}
      >
        <Route path="/articles/:articleId">
          <ArticleEdit />
        </Route>
      </MemoryRouter>
    );

    setTimeout(() => {
      expect(getArticle).toHaveBeenCalledTimes(1);
      expect(getArticle).toHaveBeenCalledWith(mockArticleId);
      expect(screen.getByLabelText("Title")).toHaveValue(mockArticle.title);
      expect(screen.getByLabelText("Content")).toHaveValue(mockArticle.content);
      expect(screen.getByLabelText("Author")).toHaveValue(mockArticle.author);
      expect(screen.getByLabelText("Regions")).toHaveValue(mockArticle.regions);
    }, 0);
  });
});
