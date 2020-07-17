import React from "react";
import { Menu } from "semantic-ui-react";
import styled from "styled-components";
import MenuItem from "./MenuItem";

// important is necessary to make styled compnents work with semantic-ui
const StyledMenu = styled(Menu)`
  width: 100% !important;
  height: 100vh !important;
`;

// if this is added to often it might be worth it to make it data driven
const sportTypes = [
  { label: "Home", url: "/" },
  { label: "Football", url: "sport/football" },
  { label: "Baseball", url: "sport/baseball" },
  { label: "Basketball", url: "sport/basketball" },
  { label: "IceHockey", url: "sport/ice-hockey" },
];

const SideMenu = ({ location }) => {
  const currentUrl = "/"; // location.pathname;
  return (
    <StyledMenu vertical>
      {sportTypes.map((sport) => (
        <MenuItem
          active={currentUrl === sport.url}
          onClick={() => {}}
          label={sport.label}
          url={sport.url}
        />
      ))}
    </StyledMenu>
  );
};

export default SideMenu;
