import PropTypes from 'prop-types';
import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';

const MyDropzone = ({input}) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      input.onChange(acceptedFiles);
    },
    [input]
  );
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag and drop some files here, or click to select files</p>
      )}
    </div>
  );
};

MyDropzone.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func
  })
};

export default MyDropzone;
