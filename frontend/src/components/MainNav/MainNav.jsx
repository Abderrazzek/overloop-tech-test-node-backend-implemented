import React from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import {
  ROUTE_HOME,
  ROUTE_ARTICLE_LIST,
  ROUTE_AUTHOR_LIST,
} from "../../constants";

function MainNav() {
  const location = useLocation();

  return (
    <div className="MainNav">
      {/* Navigation bar */}
      <Navbar bg="dark" variant="dark">
        {/* Brand logo */}
        <Navbar.Brand as={Link} to={ROUTE_HOME}>
          Overloop Tech Test
        </Navbar.Brand>

        {/* Navigation links */}
        <Nav className="mr-auto">
          {/* Articles link */}
          <Nav.Link
            as={Link}
            to={ROUTE_ARTICLE_LIST}
            className={location.pathname === ROUTE_ARTICLE_LIST ? "active" : ""}
          >
            Articles
          </Nav.Link>

          {/* Authors link */}
          <Nav.Link
            as={Link}
            to={ROUTE_AUTHOR_LIST}
            className={location.pathname === ROUTE_AUTHOR_LIST ? "active" : ""}
          >
            Authors
          </Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
}

export default MainNav;
