import React, { useState, useEffect } from "react";
import Multiselect from "react-widgets/lib/Multiselect";
import { useSnackbar } from "notistack";

import { listRegions } from "../../services/regions";
import { SNACKBAR_VARIANT_ERROR } from "../../constants";

function RegionDropdown({ value, onChange, id }) {
  const [regions, setRegions] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const data = await listRegions();
        setRegions(data);
      } catch (error) {
        enqueueSnackbar("Failed to fetch regions", {
          variant: SNACKBAR_VARIANT_ERROR,
        });
      }
    };

    fetchRegions();
  }, [enqueueSnackbar]);

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
