import React from 'react';
import { Box, Text } from 'grommet';
import { CaretUpFill, CaretDownFill } from 'grommet-icons';

const ColumnHeader = ({
  label,
  property,
  sort,
  handleSort,
  showUpArrow,
  showDownArrow,
  setShowUpArrow,
  setShowDownArrow,
}) => {
  const handleClick = (arrowType) => {
    handleSort(property);
    if (arrowType === 'up') {
      setShowUpArrow(!showUpArrow);
      setShowDownArrow(true);
    } else {
      setShowDownArrow(!showDownArrow);
      setShowUpArrow(true);
    }
  };

  return (
    <Box
      direction="row"
      align="center"
      justify="between"
      onClick={() => handleClick()}
    >
      <Text>{label}</Text>
      <Box direction="column" align="center">
        <CaretUpFill
          style={{
            visibility:
              sort.property === property && showUpArrow ? 'visible' : 'hidden',
            marginBottom: -7,
            marginLeft: 4,
          }}
          onClick={(event) => {
            event.stopPropagation();
            handleClick('up');
          }}
        />
        <CaretDownFill
          style={{
            visibility:
              sort.property === property && showDownArrow
                ? 'visible'
                : 'hidden',
            marginTop: -7,
            marginLeft: 4,
          }}
          onClick={(event) => {
            event.stopPropagation();
            handleClick('down');
          }}
        />
      </Box>
    </Box>
  );
};

export default ColumnHeader;
