import React, { useState, useEffect } from "react";
import DropdownList from "react-widgets/lib/DropdownList";

import { listAuthors } from "../../services/authors";
import { authorDefaultValue } from "../../constants";

// AuthorDropdown component
function AuthorDropdown({ value, onChange, id }) {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    // Fetch authors from the server
    const fetchAuthors = async () => {
      const data = await listAuthors();
      // Prepend the default author value to the received data
      setAuthors([authorDefaultValue, ...data]);
    };

    fetchAuthors();
  }, []);

  // Custom render function for each author item
  const renderAuthor = ({ item }) => (
    <span>
      {item.firstName} {item.lastName}
    </span>
  );

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
    </div>
  );
}

export default AuthorDropdown;
