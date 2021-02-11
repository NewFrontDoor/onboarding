import React, {useState, useLayoutEffect, useRef} from 'react';
import {
  Box,
  Heading,
  Button,
  ButtonGroup,
  Text,
  CloseButton,
  Stack,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';
import pagemap from 'pagemap';

const ControlBox = ({
  isOwner,
  editors = [],
  loading,
  formState,
  reset,
  initialData
}) => {
  const inputElement = useRef(null);
  const [mapShowing, setMapShowing] = useState(false);
  const [editorList, editEditors] = useState(editors);
  const [inputValue, setValue] = useState('');

  useLayoutEffect(() => {
    if (!mapShowing) {
      pagemap(inputElement.current, {
        viewport: null,
        styles: {
          'header,footer,section,article': 'rgba(0, 0, 0, 0.08)',
          'h1,a': 'rgba(0, 0, 0, 0.10)',
          'h2,h3,h4': 'rgba(0, 0, 0, 0.08)'
        },
        back: 'rgba(0, 0, 0, 0.02)',
        view: 'rgba(0, 0, 0, 0.05)',
        drag: 'rgba(0, 0, 0, 0.10)',
        interval: null
      });
      setMapShowing(true);
    }
  }, [mapShowing, setMapShowing]);

  function deleteEditors(email) {
    const newEditors = editorList.filter((entry) => entry !== email);
    editEditors(newEditors);
  }

  function addEditors(email) {
    if (
      email !== '' &&
      editorList.filter((entry) => entry === email).length === 0
    ) {
      editEditors(editorList.concat(email));
    }

    setValue('');
  }

  return (
    <Box
      pos="fixed"
      right="200px"
      bottom="400px"
      border="2px"
      p="20px"
      borderRadius="10px"
      w="344px"
    >
      <Heading size="lg">Controls</Heading>
      <Heading size="md">Mini map</Heading>
      <Box h="200px">
        <Box
          ref={inputElement}
          as="canvas"
          style={{height: '100%', width: '300px', margin: 'auto'}}
        />
      </Box>
      <ButtonGroup variant="outline" spacing="6">
        <Input
          isDisabled={!formState.isDirty}
          isLoading={loading}
          loadingText="Loading"
          type="submit"
        />
        <Button
          isDisabled={!formState.isDirty}
          onClick={() =>
            reset(
              {...initialData},
              {
                errors: false,
                dirtyFields: false,
                isDirty: false,
                isSubmitted: false
              }
            )
          }
        >
          Revert
        </Button>
      </ButtonGroup>
      {isOwner && (
        <Box>
          <Heading size="md">Verified editors</Heading>
          <Text>Add email addresses below</Text>
          {editorList.map((editor) => (
            <Stack key={editor} direction="row" spacing={6}>
              <Text>{editor}</Text>
              <CloseButton size="sm" onClick={() => deleteEditors(editor)} />
            </Stack>
          ))}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              addEditors(inputValue);
            }}
          >
            <InputGroup>
              <Input
                placeholder="Add email, hit enter"
                value={inputValue}
                onChange={(event) => {
                  setValue(event.target.value);
                }}
              />
              <InputRightElement>
                <Button
                  onClick={(event) => {
                    event.preventDefault();
                    addEditors(inputValue);
                  }}
                >
                  +
                </Button>
              </InputRightElement>
            </InputGroup>
          </form>
        </Box>
      )}
    </Box>
  );
};

export default ControlBox;
