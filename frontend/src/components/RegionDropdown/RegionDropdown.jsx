import React, { useState, useEffect } from "react";
import Multiselect from "react-widgets/lib/Multiselect";
import { listRegions } from "../../services/regions";

function RegionDropdown({ value, onChange, id }) {
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const data = await listRegions();
        setRegions(data);
      } catch (error) {
        console.error("Failed to fetch regions", error);
        // Handle the error appropriately, e.g., display a notification
      }
    };

    fetchRegions();
  }, []);

  return (
    <div id={id} className="RegionDropdown">
      {/* Multiselect component from react-widgets */}
      <Multiselect
        value={value}
        data={regions}
        textField="name"
        valueField="id"
        onChange={onChange}
        allowCreate={false}
      />
    </div>
  );
}

export default RegionDropdown;
