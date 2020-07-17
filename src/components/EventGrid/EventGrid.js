import React from "react";
import styled from "styled-components";

const EventGrid = ({
  layout,
  itemDimensions,
  children,
  rowDimensions,
  columnDimensions,
  className,
}) => {
  const rows = layout.split("\n").filter((string) => string !== "");
  const numberOfRows = rows.length;
  const numberOfColumns = rows[0].replace(/ /g, "").replace(/"/g, "").length;
  const allAreas = rows.map((row) => row.replace(/"/g, "").split(" ")).flat(1);
  const uniqueAreas = [...new Set(allAreas)];
  return (
    <Grid
      layout={layout}
      itemDimensions={itemDimensions}
      rowDimensions={rowDimensions}
      columnDimensions={columnDimensions}
      numberOfColumns={numberOfColumns}
      numberOfRows={numberOfRows}
      className={className}
    >
      {uniqueAreas.map((areaName, index) => (
        <GridSpace areaName={areaName} key={areaName}>
          {children[index]}
        </GridSpace>
      ))}
    </Grid>
  );
};

export default EventGrid;

EventGrid.defaultProps = {
  itemDimensions: { width: "1fr", height: "1fr" },
  rowDimensions: null,
  columnDimensions: null,
  className: null,
};

const Grid = styled.div`
  display: grid;
  grid-gap: 30px;
  grid-template-areas: ${(props) => props.layout};
  grid-template-rows: ${(props) =>
    props.rowDimensions ||
    (props.itemDimensions.height + " ").repeat(props.numberOfRows)};
  grid-template-columns: ${(props) =>
    props.columnDimensions ||
    (props.itemDimensions.width + " ").repeat(props.numberOfColumns)};
  justify-content: center;
`;

const GridSpace = styled.div`
  grid-area: ${(props) => props.areaName} !important;
`;
