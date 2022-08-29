import { Box, Button, Center, Heading, Link, Stack } from "@chakra-ui/react";
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
    history.push(`/orders/order_confirm`);
  }, [history]);

  return (
    <Box>
      <Center
        w="80%"
        h="400px"
        bg="white"
        mx="auto"
        my="20%"
        borderRadius="md"
        shadow="md"
        textAlign="center"
      >
        <Stack spacing={20}>
          <Button colorScheme="blue">
            <Heading>
              <Link onClick={onClickNewOrder}>オーダーを提出する</Link>
            </Heading>
          </Button>
          <Button colorScheme="blue">
            <Heading>
              <Link onClick={onClickConfirmOrder}>オーダーを確認する</Link>
            </Heading>
          </Button>
        </Stack>
      </Center>
    </Box>
  );
});