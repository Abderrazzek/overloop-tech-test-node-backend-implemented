import React, { useState, useEffect } from "react";
import DropdownList from "react-widgets/lib/DropdownList";

import { listAuthors } from "../../services/authors";
import { AUTHOR_DEFAULT_VALUE } from "../../constants";

// AuthorDropdown component
function AuthorDropdown({ value, onChange, id }) {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    // Fetch authors from the server
    const fetchAuthors = async () => {
      const data = await listAuthors();
      // Prepend the default author value to the received data
      setAuthors([AUTHOR_DEFAULT_VALUE, ...data]);
    };

    fetchAuthors();
  }, []);

  // Custom render function for each author item
  const renderAuthor = ({ item }) => (
    <span>
      {item.firstName} {item.lastName}
    </span>
  );

  const handleClearSelectedAuthor = () => {
    onChange(AUTHOR_DEFAULT_VALUE);
  };

  return (
    <div id={id} className="AuthorDropdown">
      {/* DropdownList component from react-widgets */}
      <DropdownList
        value={value}
        data={authors}
        textField="firstName"
        valueField="id"
        onChange={onChange}
        allowCreate={false}
        itemComponent={renderAuthor}
        valueComponent={renderAuthor}
      />
      {value.id !== 0 && (
        <button onClick={handleClearSelectedAuthor}>
          Clear Selected Author
        </button>
      )}
    </div>
  );
}

export default AuthorDropdown;
