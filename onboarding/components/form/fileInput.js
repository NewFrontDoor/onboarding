import React, {useCallback, useState, useMemo, useEffect} from 'react';
import {useDropzone} from 'react-dropzone';
import {useFormContext, getValues} from 'react-hook-form';
import {FormLabel, Heading} from '@chakra-ui/react';
import {MdDelete} from 'react-icons/md';

const baseStyle = {
  flex: '1',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: '2px',
  borderRadius: '2px',
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 150,
  height: 150,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  position: 'relative',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

const FileInput = (props) => {
  const {name, label = name, description} = props;
  const {register, unregister, setValue, getValues, watch} = useFormContext();

  const files = watch(name);

  const onDrop = useCallback(
    (droppedFiles) => {
      const concatenatedFileList = [
        ...droppedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        ),
        ...(getValues(name) || [])
      ];
      setValue(name, concatenatedFileList, {shouldValidate: true});
    },
    [setValue, name]
  );

  const imageThumbs =
    files &&
    files.map((file) => (
      <div key={file.name} style={thumb}>
        <div style={thumbInner}>
          <img src={file.preview} style={img} />
          <button
            type="button"
            style={{position: 'absolute', top: 0, right: 0}}
            onClick={() => remove(file.name)}
          >
            <MdDelete color="red" size="1.5em" />
          </button>
        </div>
      </div>
    ));

  const fileThumbs = (
    <ul>{files && files.map((file) => <li>{file.name}</li>)}</ul>
  );

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files && files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  function remove(filename) {
    const filteredFileList = getValues(name).filter(
      (item) => item.name !== filename
    );
    setValue(name, filteredFileList, {shouldValidate: true});
  }

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
    accept: props.accept
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  useEffect(() => {
    register(name);
    return () => {
      unregister(name);
    };
  }, [register, unregister, name]);

  return (
    <>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      {description}
      <div {...getRootProps({style})}>
        <input {...props} id={name} {...getInputProps()} />
        <p>{props.text || 'Drop the files here... (or click to select)'}</p>
      </div>
      <aside style={thumbsContainer}>
        {props.accept.includes('image') ? imageThumbs : fileThumbs}
      </aside>
    </>
  );
};

export default FileInput;
