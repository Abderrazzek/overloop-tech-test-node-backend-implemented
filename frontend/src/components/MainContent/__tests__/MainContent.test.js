import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";

import MainContent from "../MainContent";
import {
  ROUTE_HOME,
  ROUTE_ARTICLE_LIST,
  ROUTE_ARTICLE_CREATE,
  ROUTE_ARTICLE_EDIT,
  ROUTE_AUTHOR_LIST,
  ROUTE_AUTHOR_CREATE,
  ROUTE_AUTHOR_EDIT,
} from "../../../constants";

describe("MainContent", () => {
  it("renders ArticleList component when the route matches ROUTE_ARTICLE_LIST", () => {
    render(
      <MemoryRouter initialEntries={[ROUTE_ARTICLE_LIST]}>
        <MainContent />
      </MemoryRouter>
    );

    expect(screen.getByText("Articles")).toBeInTheDocument();
  });

  it("renders ArticleCreate component when the route matches ROUTE_ARTICLE_CREATE", () => {
    render(
      <MemoryRouter initialEntries={[ROUTE_ARTICLE_CREATE]}>
        <MainContent />
      </MemoryRouter>
    );

    expect(screen.getByText("Create Article")).toBeInTheDocument();
  });

  it("renders ArticleEdit component when the route matches ROUTE_ARTICLE_EDIT", () => {
    const articleId = "123"; // Example article ID

    render(
      <MemoryRouter initialEntries={[`${ROUTE_ARTICLE_EDIT}/${articleId}`]}>
        <MainContent />
      </MemoryRouter>
    );

    expect(screen.getByText("Edit Article")).toBeInTheDocument();
  });

  it("renders AuthorList component when the route matches ROUTE_AUTHOR_LIST", () => {
    render(
      <MemoryRouter initialEntries={[ROUTE_AUTHOR_LIST]}>
        <MainContent />
      </MemoryRouter>
    );

    expect(screen.getByText("Authors")).toBeInTheDocument();
  });

  it("renders AuthorCreate component when the route matches ROUTE_AUTHOR_CREATE", () => {
    render(
      <MemoryRouter initialEntries={[ROUTE_AUTHOR_CREATE]}>
        <MainContent />
      </MemoryRouter>
    );

    expect(screen.getByText("Create Author")).toBeInTheDocument();
  });

  it("renders AuthorEdit component when the route matches ROUTE_AUTHOR_EDIT", () => {
    const authorId = "456"; // Example author ID

    render(
      <MemoryRouter initialEntries={[`${ROUTE_AUTHOR_EDIT}/${authorId}`]}>
        <MainContent />
      </MemoryRouter>
    );

    expect(screen.getByText("Edit Author")).toBeInTheDocument();
  });

  it("redirects to ArticleList component when the route matches ROUTE_HOME", () => {
    act(() => {
      render(
        <MemoryRouter initialEntries={[ROUTE_HOME]}>
          <MainContent />
        </MemoryRouter>
      );
    });

    expect(screen.getByText("Articles")).toBeInTheDocument();
  });
});
