import { Box, Heading, Link, Button, VStack } from "@chakra-ui/react";
import { stat } from "fs";
import { VFC, memo, useCallback, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getTeams, getMembers } from "../../../api/order";
import { AuthContext } from "../../../App";
import { HaveTeams } from "../../../types/have_teams";

export const UserHasTeam: VFC = memo(() => {

  const history = useHistory();

  const [teams, setShowTeams] = useState<HaveTeams[]>();
  const { currentUser } = useContext<any>(AuthContext);

  const handleGetTeam = async () => {
    try {
      const res = await getTeams(currentUser.id);
      console.log(res.data);
      setShowTeams(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const onClickCreateOrder = (id:number) => {
    history.push(`/orders/create/${id}`, teams);
  };

  useEffect(() => {
    handleGetTeam();
  }, []);

  return (
    <Box>
      <VStack
        spacing={4}
        align='center'
      >
        <Heading as="h2" textAlign="center" mb="16px" color="red">
          チームの選択
        </Heading>
        {teams?.map((team) => (
          <Box key={team.id}>
            <Button colorScheme="blue">
              <Heading>
                <Link onClick={() => onClickCreateOrder(team.id)}>
                  {team.name}
                </Link>
              </Heading>
            </Button>
          </Box>
        ))}
      </VStack>
    </Box>
    );
});