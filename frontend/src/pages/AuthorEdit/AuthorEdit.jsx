import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { ROUTE_AUTHOR_LIST } from "../../constants";
import { getAuthor, editAuthor } from "../../services/authors";

function AuthorEdit() {
  const history = useHistory();
  const { authorId } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    const fetchAuthor = async () => {
      const data = await getAuthor(authorId);
      setFirstName(data.firstName);
      setLastName(data.lastName);
    };

    fetchAuthor();
  }, [authorId]);

  const handleSave = async () => {
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    let errors = {};

    // Check if fields are empty after trimming
    if (trimmedFirstName === "") {
      errors.firstName = "First name is required.";
    }
    if (trimmedLastName === "") {
      errors.lastName = "Last name is required.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    const payload = { firstName: trimmedFirstName, lastName: trimmedLastName };

    try {
      await editAuthor(authorId, payload);
      history.push(ROUTE_AUTHOR_LIST);
    } catch (error) {
      console.error("Failed to update author", error);
      // Handle the error appropriately, e.g., display a notification
    }
  };

  const handleCancel = () => {
    history.push(ROUTE_AUTHOR_LIST);
  };

  return (
    <div className="AuthorEdit">
      <h1>Edit Author</h1>
      <Form>
        <Form.Group>
          <Form.Label htmlFor="firstName">First Name</Form.Label>
          <Form.Control
            id="firstName"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
              setFieldErrors({ ...fieldErrors, firstName: null }); // Reset error when input changes
            }}
            isInvalid={!!fieldErrors.firstName} // Apply red border if there's an error
          />
          {fieldErrors.firstName && (
            <Form.Text className="text-danger">
              {fieldErrors.firstName}
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="lastName">Last Name</Form.Label>
          <Form.Control
            id="lastName"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(event) => {
              setLastName(event.target.value);
              setFieldErrors({ ...fieldErrors, lastName: null }); // Reset error when input changes
            }}
            isInvalid={!!fieldErrors.lastName} // Apply red border if there's an error
          />
          {fieldErrors.lastName && (
            <Form.Text className="text-danger">
              {fieldErrors.lastName}
            </Form.Text>
          )}
        </Form.Group>
        <div className="button-container">
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Author
          </Button>
        </div>
      </Form>
      <style>{`
        .AuthorEdit {
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

export default AuthorEdit;
