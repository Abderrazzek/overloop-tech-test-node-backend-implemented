import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { ROUTE_ARTICLE_LIST, authorDefaultValue } from "../../constants";
import { getArticle, editArticle } from "../../services/articles";
import AuthorDropdown from "../../components/AuthorDropdown/AuthorDropdown";
import RegionDropdown from "../../components/RegionDropdown/RegionDropdown";

function ArticleEdit(props) {
  const history = useHistory();
  const { articleId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState(authorDefaultValue);
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    const fetchArticle = async () => {
      const data = await getArticle(articleId);
      setTitle(data.title);
      setContent(data.content);
      setRegions(data.regions);
      if (data.author && data.author.id != 0) setAuthor(data.author);
    };

    fetchArticle();
  }, [articleId]);

  const handleSave = async () => {
    const payload = {
      title,
      content,
      authorId: author.id !== 0 ? author.id : null,
      regions,
    };
    await editArticle(articleId, payload);
    history.push(ROUTE_ARTICLE_LIST);
  };

  return (
    <div className="ArticleEdit">
      <h1>Edit Article</h1>
      <Form>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Content"
            rows="5"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author</Form.Label>
          <AuthorDropdown
            value={author}
            onChange={(author) => setAuthor(author)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Regions</Form.Label>
          <RegionDropdown
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

export default ArticleEdit;
