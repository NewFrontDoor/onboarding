import PropTypes from 'prop-types';
import {useCallback, useMemo, useEffect} from 'react';
import {useDropzone} from 'react-dropzone';
import {useFormContext} from 'react-hook-form';
import {FormLabel} from '@chakra-ui/react';
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
  const {name, label = name, description, project, type, isArray} = props;
  const {register, unregister, setValue, getValues, watch} = useFormContext();

  const files = watch(name);

  const onDrop = useCallback(
    (droppedFiles) => {
      const success = droppedFiles.map((file) => {
        const formData = new FormData();
        // Actual file has to be appended last.
        formData.append('project', project);
        formData.append('targetfield', name);
        formData.append('type', type);
        formData.append('isArray', isArray);
        formData.append('file', file, file.path);
        return fetch('/api/upload-file', {
          method: 'POST',
          body: formData
        })
          .then((response) => {
            return response.json();
          })
          .then((result) => {
            console.log('Success:', result);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      });

      console.log(success);

      const concatenatedFileList = [
        ...droppedFiles.map((file) => {
          return Object.assign(file, {
            preview: URL.createObjectURL(file)
          });
        }),
        ...(getValues(name) || [])
      ];
      setValue(name, concatenatedFileList, {shouldValidate: true});
    },
    [setValue, getValues, name]
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
    <ul>
      {files && files.map((file) => <li key={file.name}>{file.name}</li>)}
    </ul>
  );

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      if (files) files.forEach((file) => URL.revokeObjectURL(file.preview));
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

FileInput.propTypes = {
  accept: PropTypes.shape({
    includes: PropTypes.func
  }),
  description: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  text: PropTypes.string
};

export default FileInput;
