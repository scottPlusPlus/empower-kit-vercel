import React from 'react';

interface JSONViewerProps {
  dataObj: Record<string, any>;
}

const JSONViewer: React.FC<JSONViewerProps> = ({ dataObj }) => {
  const jsonString = JSON.stringify(dataObj, null, 2); // pretty-print with 2 spaces

  return (
    <div className="whitespace-pre">
    <pre className="whitespace-pre-wrap overflow-wrap-break-word">
      {jsonString}
    </pre>
  </div>
  );
};

export default JSONViewer;