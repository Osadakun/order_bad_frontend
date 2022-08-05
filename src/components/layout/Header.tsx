import { Flex, Heading, Link, Box } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { VFC, memo, useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import { signOut } from "../../api/auth";
import { AuthContext } from "../../App";

export const Header: VFC = memo(() => {
  const history = useHistory();
  const { loading, isSignedIn, currentUser } = useContext<any>(AuthContext);

  const onClickHome = useCallback(() => history.push("/"), [history]);
  const onClickNewPost = useCallback(() => {
    history.push("/new");
  }, [history]);
  const onClickSignUp = useCallback(() => {
    history.push("/signup");
  }, [history]);
  const onClickSignIn = useCallback(() => {
    history.push("/signin");
  }, [history]);
  const onClickProfile = () => {
    history.push(`/user/${currentUser.id}`);
  };

  // サインイン情報更新
  const { setIsSignedIn } = useContext<any>(AuthContext);
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
        console.log("succeeded in sign out");
      } else {
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
          <Box mr="24px">
              <Link onClick={onClickNewPost}>オーダーを提出する</Link>
            </Box>
            <Box mr="24px">
              <Link>オーダーを確認する</Link>
            </Box>
        </Flex>
        <AuthButtons />
      </Flex>
    </>
  );
});