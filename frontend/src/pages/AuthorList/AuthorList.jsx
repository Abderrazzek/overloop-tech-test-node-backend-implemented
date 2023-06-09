import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";

import { ROUTE_AUTHOR_PREFIX, ROUTE_AUTHOR_CREATE } from "../../constants";
import { listAuthors } from "../../services/authors";

function AuthorList() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const data = await listAuthors();
        setAuthors(data);
      } catch (error) {
        console.error("Failed to fetch authors", error);
        // Handle the error appropriately, e.g., display a notification
      }
    };

    fetchAuthors();
  }, []);

  const renderAuthors = () =>
    authors.map((author) => {
      const { id, firstName, lastName } = author;

      return (
        <tr key={id}>
          <td>
            <Link to={`${ROUTE_AUTHOR_PREFIX}/${id}`}>
              {`${firstName} ${lastName}`}
            </Link>
          </td>
        </tr>
      );
    });

  return (
    <div className="AuthorList">
      <h1>Authors</h1>
      <Link className="d-block mb-3" to={ROUTE_AUTHOR_CREATE}>
        Create a new Author
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th htmlFor="authorName">Name</th>
          </tr>
        </thead>
        <tbody>{renderAuthors()}</tbody>
      </Table>
    </div>
  );
}

export default AuthorList;
