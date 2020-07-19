import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "@reach/router";

const NavLink = (props) => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        className: isCurrent ? "active item" : "item",
      };
    }}
  />
);

const MenuItem = ({ label, onClick, url }) => {
  return (
    <Menu.Item
      onClick={onClick}
      as={(props) => <NavLink {...props} to={url} />}
    >
      {label}
    </Menu.Item>
  );
};

export default MenuItem;
