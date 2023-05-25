import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { ROUTE_AUTHOR_LIST } from "../../constants";
import { getAuthor, editAuthor } from "../../services/authors";

function AuthorEdit(props) {
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
    await editAuthor(authorId, payload);
    history.push(ROUTE_AUTHOR_LIST);
  };

  return (
    <div className="AuthorEdit">
      <h1>Edit Author</h1>
      <Form>
        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control
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
          <Form.Label>Last Name</Form.Label>
          <Form.Control
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
        <Button variant="primary" onClick={handleSave}>
          Save Author
        </Button>
      </Form>
    </div>
  );
}

export default AuthorEdit;
