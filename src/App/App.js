import React from "react";
import { Router } from "@reach/router";
import styled from "styled-components";
import Home from "../pages/Home";
import SportsDashboard from "../pages/SportsDashboard";
import EventDetails from "../pages/EventDetails";
import SideMenu from "../components/SideMenu";

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  width: 100%;
  height: 100%;
`;

const App = () => {
  return (
    <Layout>
      <SideMenu />
      <Router>
        <Home path="/" />
        <SportsDashboard path="sport/:sportType" />
        <EventDetails path="event-details/:eventId" />
      </Router>
    </Layout>
  );
};

export default App;
