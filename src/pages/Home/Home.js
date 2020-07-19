import React, { useEffect, useState } from "react";
import { useFetch } from "~/src/hooks";
import TopEvents from "../../components/TopEvents/TopEvents";
import { Page, Section } from "../styled-components";

const Home = () => {
  const { data, error, isLoading } = useFetch(
    "https://api.smarkets.com/v3/popular/home"
  );

  // production would need consistent ui for loading and error handling across screens
  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  // seems top events are consistently returned with this path so assuming that is the case
  const allEvents = data?.home?.[0]?.events;
  return (
    <Page>
      <Section>
        <TopEvents events={allEvents} header="Top Events" />
      </Section>
    </Page>
  );
};

export default Home;
