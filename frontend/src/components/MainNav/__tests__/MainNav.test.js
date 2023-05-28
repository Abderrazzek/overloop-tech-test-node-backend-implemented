import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import MainNav from "../MainNav";
import {
  ROUTE_HOME,
  ROUTE_ARTICLE_LIST,
  ROUTE_AUTHOR_LIST,
} from "../../../constants";

describe("MainNav", () => {
  it("renders the brand logo with the correct text and link", () => {
    render(
      <MemoryRouter initialEntries={[ROUTE_HOME]}>
        <MainNav />
      </MemoryRouter>
    );

    const brandLogo = screen.getByText("Overloop Tech Test");
    expect(brandLogo).toBeInTheDocument();
    expect(brandLogo.getAttribute("href")).toBe(ROUTE_HOME);
  });

  it("renders the Articles link with the correct text and active class when the route matches ROUTE_ARTICLE_LIST", () => {
    render(
      <MemoryRouter initialEntries={[ROUTE_ARTICLE_LIST]}>
        <MainNav />
      </MemoryRouter>
    );

    const articlesLink = screen.getByText("Articles");
    expect(articlesLink).toBeInTheDocument();
    expect(articlesLink.getAttribute("href")).toBe(ROUTE_ARTICLE_LIST);
    expect(articlesLink.classList.contains("active")).toBe(true);
  });

  it("renders the Authors link with the correct text and active class when the route matches ROUTE_AUTHOR_LIST", () => {
    render(
      <MemoryRouter initialEntries={[ROUTE_AUTHOR_LIST]}>
        <MainNav />
      </MemoryRouter>
    );

    const authorsLink = screen.getByText("Authors");
    expect(authorsLink).toBeInTheDocument();
    expect(authorsLink.getAttribute("href")).toBe(ROUTE_AUTHOR_LIST);
    expect(authorsLink.classList.contains("active")).toBe(true);
  });

  it("does not add the active class to the links when the route does not match", () => {
    render(
      <MemoryRouter initialEntries={[ROUTE_HOME]}>
        <MainNav />
      </MemoryRouter>
    );

    const articlesLink = screen.getByText("Articles");
    const authorsLink = screen.getByText("Authors");
    expect(articlesLink.classList.contains("active")).toBe(false);
    expect(authorsLink.classList.contains("active")).toBe(false);
  });
});
