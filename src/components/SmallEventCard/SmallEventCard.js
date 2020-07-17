import React from "react";
import { Card, Icon } from "semantic-ui-react";
import styled from "styled-components";

const description =
  "Bet and trade on action from the top sports live from your house!";

const StyledCard = styled(Card)`
  height: 100% !important;
  width: 100% !important;
`;

const SmallEventCard = ({ event }) => {
  return (
    <StyledCard>
      <Card.Content header={event.name} />
      <Card.Content description={description} />
      <Card.Content extra>
        <Icon name="clock" />
        {event.state === "live" ? "live" : event.start_date}
      </Card.Content>
    </StyledCard>
  );
};

export default SmallEventCard;
