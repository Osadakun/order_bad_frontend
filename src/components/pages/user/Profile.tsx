import { useEffect, useState, FC } from "react";
import { Box, Heading, Text, Center, Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { getDetailUser } from "../../../api/user";

export const Profile: FC = () => {
  const [user, setUser] = useState({
    id: 0,
    name: "",
    email: "",
  });

  const query = useParams();

  const handleGetDetailUser = async (query: any) => {
    try {
      const res = await getDetailUser(query.id);
      console.log(res.data);
      setUser(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleGetDetailUser(query);
  }, [query]);
  return (
    <Box width="100%" height="100%" p="40px">
      <Heading as="h1" textAlign="center" mb={4}>
        投稿詳細
      </Heading>
      <Center
        width="180px"
        height="180px"
        bg="white"
        mx="auto"
        borderRadius="md"
        shadow="md"
        p="16px"
      >
        <Stack width="100%">
          <Text textAlign="center">{user?.name}</Text>
          <Text textAlign="center">{user?.email}</Text>
        </Stack>
      </Center>
    </Box>
  );
};