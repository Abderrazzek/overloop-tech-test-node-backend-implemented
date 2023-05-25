import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { ROUTE_ARTICLE_LIST, AUTHOR_DEFAULT_VALUE } from "../../constants";
import { createArticle } from "../../services/articles";
import AuthorDropdown from "../../components/AuthorDropdown/AuthorDropdown";
import RegionDropdown from "../../components/RegionDropdown/RegionDropdown";

function ArticleCreate() {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState(AUTHOR_DEFAULT_VALUE);
  const [regions, setRegions] = useState([]);

  const handleSave = async () => {
    const payload = {
      title,
      content,
      authorId: author.id !== 0 ? author.id : null,
      regions,
    };

    await createArticle(payload);
    history.push(ROUTE_ARTICLE_LIST);
  };

  return (
    <div className="ArticleCreate">
      <h1>Create Article</h1>
      <Form>
        <Form.Group>
          <Form.Label htmlFor="title-input">Title</Form.Label>
          <Form.Control
            id="title-input"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="content-input">Content</Form.Label>
          <Form.Control
            id="content-input"
            as="textarea"
            placeholder="Content"
            rows="5"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="author-input">Author</Form.Label>
          <AuthorDropdown
            id="author-input"
            value={author}
            onChange={(author) => setAuthor(author)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="regions-input">Regions</Form.Label>
          <RegionDropdown
            id="regions-input"
            value={regions}
            onChange={(regions) => setRegions(regions)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSave}>
          Save Article
        </Button>
      </Form>
    </div>
  );
}

export default ArticleCreate;
