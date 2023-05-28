import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import RegionDropdown from "../RegionDropdown";

// Mock the listRegions function from "../../../services/regions"
jest.mock("../../../services/regions", () => ({
  listRegions: jest.fn(() =>
    Promise.resolve([
      {
        id: 1,
        code: "AU",
        name: "Australia",
      },
      {
        id: 2,
        code: "UK",
        name: "United Kingdom",
      },
      {
        id: 3,
        code: "US",
        name: "United States of America",
      },
    ])
  ),
}));

describe("RegionDropdown", () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <RegionDropdown id="region-dropdown" value={[]} onChange={() => {}} />
      );
    });
  });

  it("renders the component with the specified ID", () => {
    const regionDropdown = screen.getByTestId("region-dropdown-inner");
    expect(regionDropdown).toBeInTheDocument();
  });
});
