import React from 'react';
import { Box, Button, Text } from 'grommet';

const CustomPagination = ({ currentPage, totalPages, onPrevious, onNext }) => {
  return (
    <Box direction="row" gap="small" align="center">
      <Button disabled={currentPage === 1} onClick={onPrevious}>
        Previous
      </Button>
      <Text>{` ${currentPage} `}</Text>
      <Button disabled={currentPage >= totalPages} onClick={onNext}>
        Next
      </Button>
    </Box>
  );
};
export default CustomPagination;
