import React from 'react';
import { Box, Button } from 'grommet';
import '../../styles/components/pagination.css';

const CustomPagination = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  onPageClick,
}) => {
  const pageButtons = [];

  // Affichage des boutons de page pour les pages précédentes et la page actuelle
  for (let i = 1; i <= totalPages; i++) {
    pageButtons.push(
      <Button
        key={i}
        className={`pageButton ${i === currentPage ? 'currentPage' : ''}`}
        label={i.toString()}
        onClick={() => onPageClick(i)}
        primary={i === currentPage}
      />
    );
  }

  return (
    <Box direction="row" gap="small" align="center">
      <Button
        disabled={currentPage === 1}
        onClick={onPrevious}
        className={currentPage === 1 ? '' : 'activeButton'}
      >
        Previous
      </Button>
      {pageButtons}
      <Button
        disabled={currentPage >= totalPages}
        onClick={onNext}
        className={currentPage >= totalPages ? '' : 'activeButton'}
      >
        Next
      </Button>
    </Box>
  );
};

export default CustomPagination;
