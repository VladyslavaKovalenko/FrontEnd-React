import React from "react";
import LoadingOverlay from 'react-loading-overlay-ts';

const LoaderOverlay = ({ active }) => {
  const overlayStyles = {
    wrapper: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }    
  };

  return (
    <LoadingOverlay
      active={active}
      spinner
      text='Loading...'
      styles={overlayStyles}
    />
  );
};

export default LoaderOverlay;
