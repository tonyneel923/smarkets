import React from "react";
import LargeEventCard from "../LargeEventCard";
import SmallEventCard from "../SmallEventCard";
import EventGrid from "../EventGrid";
import { useTransformOnScreenChange, useFetch } from "~/src/hooks";

// layout could be changed by api by using event grid
// we will predefine based on page size
const xlLayout = `
"a b c"
"a d e"
"a f g"
`;

const largeLayout = `
"a b"
"a c"
"a d"
"e f"
`;

const mediumLayout = `
"a"
"a"
"a"
"b"
"c"
"d"
"e"
"f"
"g"
`;

const Event = ({ event }) => {
  // right now tall is always first which is how I have made the layouts above
  // this solution would need to be api driven for layouts if tall changes
  // for now I am just making the assumption it will be first item for poc
  // still included layout in the event prop for poc
  if (event.layout === "tall") {
    return <LargeEventCard event={event} />;
  }
  return <SmallEventCard event={event} />;
};

// TODO specify shape
const TopEvents = ({ events, header }) => {
  // create string of ids
  const eventIdsToFetch = events.map((event) => event.event_id).join(",");
  // get data for those events
  const { data, error, isLoading } = useFetch(
    `https://api.smarkets.com/v3/events/${eventIdsToFetch}/`
  );

  // define layouts for breakpoints in screen
  const currentLayout = useTransformOnScreenChange({
    medium: mediumLayout,
    large: largeLayout,
    xl: xlLayout,
  });

  if (isLoading) {
    return <div>loading top events</div>;
  }

  if (error) {
    return <div>error loading top events</div>;
  }

  // events are not returned in order
  // combining for the layout prop
  // would use one query if graphql
  // if endpoints in prod would probably use selectors
  const eventsMap = data.events.reduce((map, currentEvent) => {
    map[currentEvent.id] = currentEvent;
    return map;
  }, {});
  const topEvents = events.map((event) => {
    return {
      ...event,
      ...eventsMap[event.event_id],
    };
  });
  return (
    <>
      <h1>{header}</h1>
      <EventGrid layout={currentLayout}>
        {topEvents.map((event) => (
          <Event key={event.event_id} event={event} />
        ))}
      </EventGrid>
    </>
  );
};

export default TopEvents;
