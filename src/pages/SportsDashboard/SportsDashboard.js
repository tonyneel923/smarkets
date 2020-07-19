import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useFetch } from "~/src/hooks";
import TopEvents from "~/src/components/TopEvents";
import { Page, Section } from "../styled-components";

const SportsDashboard = ({ sportType }) => {
  const { data, error, isLoading } = useFetch(
    `https://api.smarkets.com/v3/popular/event_ids/sport/${sportType}/`
  );

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const topEvents = data.popular_event_ids.map((eventId, index) => {
    return {
      event_id: eventId,
      layout: index === 0 ? "tall" : "small",
    };
  });

  return (
    <Page>
      <Section>
        <TopEvents events={topEvents} header={`Top Events in ${sportType}`} />
      </Section>
    </Page>
  );
};

export default SportsDashboard;
