import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { ROUTE_ARTICLE_LIST, AUTHOR_DEFAULT_VALUE } from "../../constants";
import { getArticle, editArticle } from "../../services/articles";
import AuthorDropdown from "../../components/AuthorDropdown/AuthorDropdown";
import RegionDropdown from "../../components/RegionDropdown/RegionDropdown";

function ArticleEdit() {
  const history = useHistory();
  const { articleId } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState(AUTHOR_DEFAULT_VALUE);
  const [regions, setRegions] = useState([]);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getArticle(articleId);
        setTitle(data.title);
        setContent(data.content);
        setRegions(data.regions);
        if (data.author && data.author.id !== 0) setAuthor(data.author);
      } catch (error) {
        console.error("Failed to fetch article", error);
        // Handle the error appropriately, e.g., display a notification
      }
    };

    fetchArticle();
  }, [articleId]);

  const handleSave = async () => {
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();
    let errors = {};

    // Check if fields are empty after trimming
    if (trimmedTitle === "") {
      errors.title = "Title is required.";
    }
    if (trimmedContent === "") {
      errors.content = "Content is required.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    const payload = {
      title: trimmedTitle,
      content: trimmedContent,
      authorId: author.id !== 0 ? author.id : null,
      regions,
    };

    try {
      await editArticle(articleId, payload);
      history.push(ROUTE_ARTICLE_LIST);
    } catch (error) {
      console.error("Failed to save article", error);
      // Handle the error appropriately, e.g., display a notification
    }
  };

  const handleCancel = () => {
    history.push(ROUTE_ARTICLE_LIST);
  };

  return (
    <div className="ArticleEdit">
      <h1>Edit Article</h1>
      <Form>
        <Form.Group>
          <Form.Label htmlFor="title">Title</Form.Label>
          <Form.Control
            id="title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setFieldErrors({ ...fieldErrors, title: null }); // Reset error when input changes
            }}
            isInvalid={!!fieldErrors.title} // Apply red border if there's an error
          />
          {fieldErrors.title && (
            <Form.Text className="text-danger">{fieldErrors.title}</Form.Text>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="content">Content</Form.Label>
          <Form.Control
            id="content"
            as="textarea"
            placeholder="Content"
            rows="5"
            value={content}
            onChange={(event) => {
              setContent(event.target.value);
              setFieldErrors({ ...fieldErrors, content: null }); // Reset error when input changes
            }}
            isInvalid={!!fieldErrors.content} // Apply red border if there's an error
          />
          {fieldErrors.content && (
            <Form.Text className="text-danger">{fieldErrors.content}</Form.Text>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="author">Author</Form.Label>
          <AuthorDropdown
            id="author"
            value={author}
            onChange={(author) => setAuthor(author)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="regions">Regions</Form.Label>
          <RegionDropdown
            id="regions"
            value={regions}
            onChange={(regions) => setRegions(regions)}
          />
        </Form.Group>
        <div className="button-container">
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Article
          </Button>
        </div>
      </Form>
      <style>{`
        .ArticleEdit {
          margin: 20px;
        }

        .button-container {
          display: flex;
          justify-content: flex-end;
          margin-top: 16px;
        }

        .button-container button + button {
          margin-left: 8px;
        }
      `}</style>
    </div>
  );
}

export default ArticleEdit;
