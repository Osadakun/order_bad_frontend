import Cookies from "js-cookie";
import React, { memo, useContext, useState, FC, useCallback } from "react";
import { Alert, AlertIcon, AlertTitle, Box, Button, Center, Heading, Input, Link, Stack } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { signIn } from "../../../api/auth";
import { AuthContext } from "../../../App";

export const SignIn: FC = memo(() => {
  const history = useHistory();

  const { setIsSignedIn, setCurrentUser } = useContext<any>(AuthContext);

  const [value, setValue] = useState({
    name: "",
    password: "",
  });

  const onResetPassword = useCallback(() => {
    history.push("/password/edit");
  }, [history]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await signIn(value);

      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        <Alert status='success'>
          <AlertIcon />
          <AlertTitle>ログアウトしました</AlertTitle>
        </Alert>
        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        history.push("/");
        console.log("ここだよーーー");
      }
    } catch (e) {
      alert('ログインに失敗しました\n入力内容を見直してください')
    }
  };
  return (
    <Box width="100%" height="100%" p="40px">
      <Center
        width="360px"
        height="360px"
        p="16px"
        bg="white"
        mx="auto"
        borderRadius="md"
        shadow="md"
        textAlign="center"
      >
        <form>
          <Stack spacing={4}>
            <Heading as="h1" textAlign="center" mb="16px" fontSize="24px">
              サインイン
            </Heading>
            <Input
              placeholder="チーム名"
              value={value.name}
              onChange={(e) => handleChange(e)}
              type="text"
              name="name"
            />
            <Input
              placeholder="パスワード"
              value={value.password}
              onChange={(e) => handleChange(e)}
              type="password"
              name="password"
            />
            <Button
              bg="teal"
              color="white"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              サインイン
            </Button>
            <Box mr="10px" color="blue.400" borderBottom="1px" >
              <Link onClick={onResetPassword}>パスワードを忘れた場合はこちら</Link>
            </Box>
          </Stack>
        </form>
      </Center>
    </Box>
  );
});