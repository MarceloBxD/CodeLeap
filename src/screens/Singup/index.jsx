import React from "react";
import {
  Container,
  Flex,
  Text,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useApp } from "../../contexts/ContextApi";
import { useNavigate } from "react-router-dom";

export default () => {
  const { name } = useApp();
  const toast = useToast();
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState("");

  const handleLogin = () => {
    if (inputValue && inputValue == name) {
      navigate("/main");
    } else if (inputValue !== name || !inputValue) {
      toast({
        title: "Error",
        description: "The username is incorrect or empty",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Container
      bgColor="#fff"
      p="5"
      rounded="lg"
      align="center"
      justifyContent="center"
      w="30rem"
      gap="5px"
    >
      <Text fontWeight="bold" align="left">
        Welcome to CodeLeap network!
      </Text>
      <Text fontWeight="400" align="left">
        Please enter your username
      </Text>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        rounded="md"
        my="8px"
        placeholder="John Doe"
      />
      <Flex justify="flex-end">
        <Button onClick={() => handleLogin()} colorScheme="linkedin">
          Enter
        </Button>
      </Flex>
    </Container>
  );
};
