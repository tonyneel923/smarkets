import React from "react";
import { Header, Icon, Divider, Tab } from "semantic-ui-react";
import styled from "styled-components";
import { useFetch } from "~/src/hooks";
import { Page, Section } from "../styled-components";

const Inline = styled.div`
  display: flex;
  align-items: center;
  margin-right: 2rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const SmallHeader = styled(Header)`
  margin: 0px 5px 0px;
`;

// placeholder tabs just for looks no actual data
const panes = [
  { menuItem: "All", render: () => <Tab.Pane>Placeholder content</Tab.Pane> },
  {
    menuItem: "Popular",
    render: () => <Tab.Pane>Placeholder content</Tab.Pane>,
  },
  {
    menuItem: "Winner",
    render: () => <Tab.Pane>Placeholder content</Tab.Pane>,
  },
];

const EventDetails = ({ location }) => {
  const currentEvent = location.state.event;
  // get league info from parent id
  // attempted to use league_table call but it returned no info
  // found I could find league from parent id
  // this parent id comes from router state, for prod I would check router state
  // and if it did not exist I would add a call to get the event data from the id in the url (for ex on refresh)
  const { data, error, isLoading } = useFetch(
    `https://api.smarkets.com/v3/events/${currentEvent.parent_id}/`
  );

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const leagueName = data.events[0].name;
  return (
    <Page>
      <Section>
        <Header as="h1">{currentEvent.name}</Header>
        <Row>
          <Inline>
            <Icon name="clock" />
            {currentEvent.state === "live" ? (
              <SmallHeader as="h3">live</SmallHeader>
            ) : (
              <SmallHeader as="h3">{currentEvent.start_date}</SmallHeader>
            )}
          </Inline>
          <Inline>
            <SmallHeader as="h3">League Name:</SmallHeader>
            <SmallHeader as="h3">{leagueName}</SmallHeader>
          </Inline>
        </Row>
      </Section>
      <Divider />
      <Section>
        <Tab panes={panes} />
      </Section>
    </Page>
  );
};

export default EventDetails;
