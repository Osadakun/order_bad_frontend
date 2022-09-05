import { Box, Center, Heading, Stack, Text } from "@chakra-ui/react";
import { memo, useContext, useEffect, useState, FC } from "react";
import { useLocation } from "react-router-dom";
import { getOrder } from "../../../api/order";
import { AuthContext } from "../../../App";
import { Order } from "../../../types/order";

export const ConfirmOrder: FC = memo(() => {

  const [order, setShowOrder] = useState<Order>();
  const { currentUser } = useContext<any>(AuthContext);
  const location = useLocation<{event_name: string }>();

  const handleGetOrder = async () => {
    try {
      const res = await getOrder(location.state.event_name, currentUser.id);
      console.log(res.data);
      setShowOrder(res.data);
    } catch (e) {
      console.log(e);
      console.log("ここだ！！！");
    }
  };

  useEffect(() => {
    handleGetOrder();
  }, []);

  return (
    <Box>
      <Center
        w="80%"
        h="570px"
        bg="white"
        mx="auto"
        my="10px"
        borderRadius="md"
        shadow="md"
        textAlign="center"
      >
        <Stack spacing={4}>
      <Heading textAlign="center" color="red">
        種目：{order?.eventName}
      </Heading>
      <Text fontSize="30px" textAlign="center">
        チーム名:{order?.name}
      </Text>
      <Text fontSize="30px" textAlign="center">
        対戦チーム名:{order?.enemyName}
      </Text>
        <Box fontSize="28px">
          第1複：{order?.firstDouble_1}
          <br></br>
          第1複：{order?.firstDouble_2}
          <br></br>
          第1単：{order?.firstSingle}
          <br></br>
          第2複：{order?.secondDouble_1}
          <br></br>
          第2複：{order?.secondDouble_2}
        </Box>
        </Stack>
      </Center>
    </Box>
  )
});