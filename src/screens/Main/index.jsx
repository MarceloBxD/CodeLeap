import {
  Container,
  Flex,
  Text,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useApp } from "../../contexts/ContextApi";
import { Link } from "react-router-dom";
import axios from "axios";

export default () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { posts, name, myPosts } = useApp();

  const handlePost = async (title, content) => {
    const data = {
      username: name,
      created_datetime: new Date(),
      title,
      content,
    };
    const response = await axios.post(
      "https://dev.codeleap.co.uk/careers/",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 201) {
      window.location.reload();
    }
  };

  const handleEdit = async (id, title, content) => {
    const data = {
      username: name,
      created_datetime: new Date(),
      title,
      content,
    };
    const response = await axios.put(
      `https://dev.codeleap.co.uk/careers/${id}/`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      window.location.reload();
    }
  };

  const handleDelete = async (id) => {
    const response = await axios.delete(
      `https://dev.codeleap.co.uk/careers/${id}/`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 204) {
      window.location.reload();
    }
  };

  useEffect(() => {
    if (title && content) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [title, content]);

  return (
    <Flex flexDir="column" bgColor="#eee">
      <Flex w="100%" bgColor="blue.600" p="5">
        <Link to="/main">
          <Text color="#fff">CodeLeap Network</Text>
        </Link>
      </Flex>
      <Flex justify="center" align="center" h="auto">
        <Container mt="20px" p="5" bgColor="#fff" rounded="md" w="30rem">
          <Text fontWeight="bold">What's on your mind?</Text>
          <Flex flexDir="column">
            <Text my="10px" as="label">
              Title
            </Text>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Hello world"
              _placeholder={{ fontSize: "12px" }}
            />
          </Flex>
          <Flex flexDir="column">
            <Text my="10px" as="label">
              Content
            </Text>
            <Input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              _placeholder={{ fontSize: "12px" }}
              placeholder="Content here"
            />
          </Flex>
          <Flex justify="flex-end" mt="20px">
            <Button
              isDisabled={isDisabled}
              colorScheme={isDisabled ? "gray" : "linkedin"}
              onClick={() => setOpenModal(true)}
            >
              Create
            </Button>
          </Flex>
          {openModal && (
            <Flex
              zIndex={"999"}
              bgColor="#00000080"
              w="100%"
              h="100vh"
              position="fixed"
              top="0"
              left="0"
              justify="center"
              align="center"
            >
              <Container
                bgColor="#fff"
                p="5"
                rounded="md"
                w="30rem"
                flexDir="column"
              >
                <Text fontWeight="bold">Are you sure?</Text>
                <Text mt="10px">Title: {title}</Text>
                <Text mt="10px">Content: {content}</Text>
                <Flex justify="flex-end" mt="20px">
                  <Button
                    colorScheme="linkedin"
                    onClick={() => setOpenModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    colorScheme="linkedin"
                    ml="10px"
                    onClick={() => handlePost(title, content)}
                  >
                    Create
                  </Button>
                </Flex>
              </Container>
            </Flex>
          )}
        </Container>
      </Flex>
      <Flex mb="20px" flexDir="column" justify="center" align="center">
        {myPosts &&
          myPosts.map((post) => (
            <Container
              borderWidth="3px"
              borderColor="blue.600"
              key={post.id}
              p="5"
              bgColor="#fff"
              rounded="md"
              w="30rem"
              my="10px"
            >
              <Flex justify="flex-end" gap="10px">
                <Button onClick={() => handleEdit(id)} colorScheme="linkedin">
                  <svg
                    style={{ width: "1rem", height: "1rem" }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </Button>
                <Button onClick={() => handleDelete(id)} colorScheme="linkedin">
                  <svg
                    style={{ width: "1rem", height: "1rem" }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </Button>
              </Flex>
              <Flex flexDir="column">
                <Text fontWeight="bold">{post.title}</Text>
                <Text>{post.content}</Text>
              </Flex>
            </Container>
          ))}
        {posts &&
          posts.map((post) => (
            <Container
              borderWidth="3px"
              borderColor="blue.600"
              key={post.id}
              p="5"
              bgColor="#fff"
              rounded="md"
              w="30rem"
              my="10px"
            >
              <Text fontWeight="bold">{post.title}</Text>
              <Text>{post.content}</Text>
            </Container>
          ))}
      </Flex>
    </Flex>
  );
};
