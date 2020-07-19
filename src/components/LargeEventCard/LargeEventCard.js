import React from "react";
import { Card, Icon, Image, Header } from "semantic-ui-react";
import styled from "styled-components";
import { Link } from "@reach/router";
import Sports from "~/src/static/images/sports.jpeg";

const description =
  "Bet and trade on action from the top sports live from your house!";

const StyledCard = styled(Card)`
  height: 100% !important;
  width: 100% !important;
`;

const StyledImage = styled(Image)`
  width: 100% !important;
`;

// if data was different enough as in smarkets ui it would be useful for different card definitions
const LargeEventCard = ({ event }) => {
  return (
    <StyledCard>
      <Card.Content>
        <Header
          as={(props) => (
            <Link
              {...props}
              to={`event-details/${event.id}`}
              state={{ event }}
            />
          )}
        >
          {event.name}
        </Header>
        <StyledImage src={Sports} alt="Sports" size="medium" />
      </Card.Content>
      <Card.Content description={description} />
      <Card.Content extra>
        <Icon name="clock" />
        {event.state === "live" ? "live" : event.start_date}
      </Card.Content>
    </StyledCard>
  );
};

export default LargeEventCard;
