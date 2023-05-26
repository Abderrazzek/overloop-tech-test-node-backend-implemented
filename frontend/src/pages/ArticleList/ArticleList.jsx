import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { useSnackbar } from "notistack";

import {
  ROUTE_ARTICLE_PREFIX,
  ROUTE_ARTICLE_CREATE,
  AUTHOR_DEFAULT_VALUE,
  SNACKBAR_VARIANT_ERROR,
} from "../../constants";
import { listArticles } from "../../services/articles";

function ArticleList() {
  const { enqueueSnackbar } = useSnackbar();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await listArticles();
        setArticles(data);
      } catch (error) {
        enqueueSnackbar("Failed to fetch articles", {
          variant: SNACKBAR_VARIANT_ERROR,
        });
      }
    };

    fetchArticles();
  }, [enqueueSnackbar]);

  const renderArticles = () =>
    articles.map((article) => {
      const { id, title, author } = article;

      return (
        <tr key={id}>
          <td>
            <Link to={`${ROUTE_ARTICLE_PREFIX}/${id}`}>{title}</Link>
          </td>
          <td>
            <span>
              {`${(author || AUTHOR_DEFAULT_VALUE).firstName} ${
                (author || AUTHOR_DEFAULT_VALUE).lastName
              }`}
            </span>
          </td>
        </tr>
      );
    });

  return (
    <div className="ArticleList">
      <h1>Articles</h1>
      <Link className="d-block mb-3" to={ROUTE_ARTICLE_CREATE}>
        Create a new Article
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>{renderArticles()}</tbody>
      </Table>
    </div>
  );
}

export default ArticleList;
