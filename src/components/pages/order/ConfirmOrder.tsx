import { Box, Heading, Center } from "@chakra-ui/react";
import { memo, useContext, useEffect, useState, VFC } from "react";
import { getOrder } from "../../../api/order";
import { AuthContext } from "../../../App";
import { Order } from "../../../types/order";

export const ConfirmOrder: VFC = memo(() => {

  const [order, setShowOrder] = useState<Order>();
  const { currentUser } = useContext<any>(AuthContext);

  const handleGetOrder = async () => {
    try {
      const res = await getOrder(currentUser.id);
      console.log(res.data);
      setShowOrder(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleGetOrder();
  }, []);

  return (
    <Box p="40px">
      <Heading as="h4" textAlign="center" mb="16px" color="red">
        オーダーの確認
      </Heading>
      <Heading as="h6" textAlign="center" mb="16px">
        チーム名:{order?.name}
        <br></br>
        対戦チーム名:{order?.enemyName}
      </Heading>
      <Center w="full" h="200">
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
      </Center>
    </Box>
  )
});