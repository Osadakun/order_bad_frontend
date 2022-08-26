import { Box, Heading, Input, Center, Button, Stack } from "@chakra-ui/react";
import React, { memo, useState, useContext, useEffect, FC } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createPost } from "../../../api/post";
import { AuthContext } from "../../../App";

export const New: FC = memo(() => {
  const [value, setValue] = useState({
    name: "",
    enemy_name: ""
  });

  const { currentUser } = useContext<any>(AuthContext);

  const history = useHistory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await createPost(value);
      console.log(res.data);
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Box width="100%" height="100%" p="40px">
      <form>
        <Stack spacing={4}>
          <Heading as="h1" textAlign="center" mb="16px" fontSize="24px">
            オーダーの作成
          </Heading>
          <Input
            placeholder="チーム名"
            value={currentUser.name}
            onChange={(e) => handleChange(e)}
            type="text"
            name="name"
          />
          <Input
            placeholder="対戦チーム名"
            value={value.enemy_name}
            onChange={(e) => handleChange(e)}
            type=""
            name="content"
          />
          <Button
            bg="teal"
            color="white"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            提出する
          </Button>
        </Stack>
      </form>
    </Box>
  );
});