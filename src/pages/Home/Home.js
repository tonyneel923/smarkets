import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useFetch } from "~/src/hooks";
import TopEvents from "../../components/TopEvents/TopEvents";

const Page = styled.main`
  padding: 3rem 1.5rem 0rem;
  background-color: #f2f2f2;
  height: 100%;
  width: 100%;
`;

const Section = styled.section`
  width: 100%;
`;

const Home = () => {
  const { data, error, isLoading } = useFetch(
    "https://api.smarkets.com/v3/popular/home"
  );

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error</div>;
  }

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
