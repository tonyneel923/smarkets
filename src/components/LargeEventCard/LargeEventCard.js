import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import styled from "styled-components";
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

const LargeEventCard = ({ event }) => {
  return (
    <StyledCard>
      <Card.Content>
        <h2 class="header">{event.name}</h2>
        <StyledImage src={Sports} size="medium" />
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
