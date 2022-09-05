import { Box, Button, Center, Heading, Link, Stack } from "@chakra-ui/react";
import { FC, memo, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getTeams } from "../../../api/order";
import { AuthContext } from "../../../App";
import { HaveTeams } from "../../../types/have_teams";

export const UserHasConfirm: FC = memo(() => {

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

  const onClickShowOrder = (eventName: string, currentUserId: number) => {
    history.push({
      pathname: `/orders/show_order/${eventName}/${currentUserId}`,
      state: {event_name: eventName}
  });
  };

  useEffect(() => {
    handleGetTeam();
  }, []);

  return (
    <Box>
      <Center
        w="80%"
        h="400px"
        bg="white"
        mx="auto"
        my="10px"
        borderRadius="md"
        shadow="md"
        textAlign="center"
      >
      <Stack
        spacing={4}
        align='center'
      >
        <Heading as="h2" textAlign="center" mb="16px" color="red">
          種目の選択
        </Heading>
        {teams?.map((team) => (
          <Box key={team.id}>
            <Button colorScheme="blue">
              <Heading>
                <Link onClick={() => onClickShowOrder(team.eventName, currentUser.id)}>
                  {team.eventName}
                </Link>
              </Heading>
            </Button>
          </Box>
        ))}
      </Stack>
      </Center>
    </Box>
    );
});