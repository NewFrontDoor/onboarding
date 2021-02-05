import React, {useState} from 'react';
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

const ControlBox = ({isOwner, editors = [], loading, isChanged}) => {
  const [editorList, editEditors] = useState(editors);
  const [inputValue, setValue] = useState('');

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
    >
      <Heading size="lg">Controls</Heading>
      <ButtonGroup variant="outline" spacing="6">
        <Button
          isDisabled={!isChanged}
          isLoading={loading}
          loadingText="Loading"
        >
          Save
        </Button>
        <Button isDisabled={!isChanged}>Revert</Button>
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
