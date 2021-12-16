import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import { colors } from '../styles';

interface Props {
  currentPage: number;
  totalPages: number;
  handleNextPage: (page: number) => void;
  handlePrevPage: (page: number) => void;
}

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: colors.BLUE,
    color: colors.BLACK,
    width: '30px',
    height: '30px',
    borderRadius: 50,
    marginLeft: 5,
    marginRight: 5,
    cursor: 'pointer',
  },
  pages: {
    marginTop: 15,
    marginBottom: 40,
  },
}));

const Pagination: React.FC<Props> = ({
  totalPages,
  currentPage,
  handlePrevPage,
  handleNextPage,
}) => {
  const styles = useStyles();
  return (
    <div className={styles.pages}>
      <button
        className={styles.button}
        onClick={() => handlePrevPage(currentPage)}
        disabled={currentPage === 1}
      >
        &#9665;
      </button>

      <span className='pagination-page-info'>
        Strona {currentPage} z {totalPages}
      </span>

      <button
        className={styles.button}
        onClick={() => handleNextPage(currentPage)}
        disabled={currentPage === totalPages}
      >
        &#9655;
      </button>
    </div>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  handlePrevPage: PropTypes.func.isRequired,
  handleNextPage: PropTypes.func.isRequired,
};

export default Pagination;
