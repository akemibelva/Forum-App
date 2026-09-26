import React from 'react';
import LoadingBarPackage from 'react-redux-loading-bar';

// Mengatasi ketidakcocokan ESM/CJS di Vite
const LoadingBar = LoadingBarPackage.default || LoadingBarPackage;

function Loading() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 99999 }}>
      <LoadingBar
        style={{
          backgroundColor: '#ff4757',
          height: '4px',
        }}
        showFastActions
      />
    </div>
  );
}

export default Loading;