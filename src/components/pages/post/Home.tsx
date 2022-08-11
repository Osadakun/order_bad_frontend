import { Box, Heading, Link, Button, VStack } from "@chakra-ui/react";
import { FC, memo, useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../App";

export const Home: FC = memo(() => {
  const { currentUser } = useContext<any>(AuthContext);

  const history = useHistory();

  const onClickNewOrder = useCallback(() => {
    history.push(`/orders/${currentUser.id}/have_team_all`);
  }, [history]);

  // posts/:idに変換される
  const onClickConfirmOrder = useCallback(() => {
    history.push(`/orders/${currentUser.id}`);
  }, [history]);

  return (
    <VStack
      spacing={4}
      align='center'
    >
      <Box h='100px'></Box>
      <Button colorScheme="blue">
        <Heading>
          <Link onClick={onClickNewOrder}>オーダーを提出する</Link>
        </Heading>
      </Button>
      <Box h='50px'></Box>
      <Button colorScheme="blue">
        <Heading>
          <Link onClick={onClickConfirmOrder}>オーダーを確認する</Link>
        </Heading>
      </Button>
    </VStack>
  );
});