import { Alert, AlertIcon, AlertTitle, AlertDescription, Flex, Heading, Link, Box } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { FC, memo, useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import { signOut } from "../../api/auth";
import { AuthContext } from "../../App";

export const Header: FC = memo(() => {
  const history = useHistory();
  const { loading, isSignedIn } = useContext<any>(AuthContext);

  const onClickHome = useCallback(() => history.push("/"), [history]);

  const onClickSignUp = useCallback(() => {
    history.push("/signup");
  }, [history]);
  const onClickSignIn = useCallback(() => {
    history.push("/signin");
  }, [history]);

  // サインイン情報更新
  const { setIsSignedIn, currentUser } = useContext<any>(AuthContext);
  // ログアウト関数
  const handleSignOut = async () => {
    try {
      const res = await signOut();

      // eslint-disable-next-line no-cond-assign
      if ((res.data.success = true)) {
        Cookies.remove("_access_token");
        Cookies.remove("_client");
        Cookies.remove("_uid");

        setIsSignedIn(false);
        history.push("/signin");
        <Alert status='success'>
          <AlertIcon />
          <AlertTitle>ログアウトしました</AlertTitle>
        </Alert>
        console.log("succeeded in sign out");
      } else {
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>ログインに失敗しました</AlertTitle>
          <AlertDescription>チーム名かパスワードを確認してください</AlertDescription>
        </Alert>
        console.log("failed in sign out");
      }
    } catch (e) {
      console.log(e);
    }
  };

  // ログイン状態によってメニュー切り替え

  const AuthButtons = () => {
    if (!loading) {
      if (isSignedIn) {
        return (
          <Flex align="center" fontSize="sm">
            <Box mr="24px">
              チーム名：{currentUser.name}
            </Box>
            <Box>
              <Link onClick={handleSignOut}>ログアウト</Link>
            </Box>
          </Flex>
        );
      } else {
        return (
          <Flex align="center" fontSize="sm">
            <Box mr="10px">
              <Link onClick={onClickSignUp}>サインアップ</Link>
            </Box>
            <Box>
              <Link onClick={onClickSignIn}>サインイン</Link>
            </Box>
          </Flex>
        );
      }
    } else {
      return <></>;
    }
  };
  return (
    <>
      <Flex
        as="nav"
        bg="teal.500"
        color="gray.50"
        align="center"
        justify="space-between"
        padding={5}
      >
        <Flex
          align="center"
          as="a"
          mr={8}
          _hover={{ cursor: "pointer" }}
          onClick={onClickHome}
        >
          <Box>
            <Heading size="md">
              石川県バドミントン協会
            </Heading>
          </Box>
        </Flex>
        <AuthButtons />
      </Flex>
    </>
  );
});