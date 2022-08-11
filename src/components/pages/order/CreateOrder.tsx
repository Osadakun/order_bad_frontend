import { Box, Button, Center, Heading, Select, Input, Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { memo, useContext, useEffect, useState, FC } from "react";
import { getMembers } from "../../../api/order";
import { AuthContext } from "../../../App";
import { Member } from "../../../types/member";

type Params = {
  id: string;
}

export const CreateOrder: FC = memo(() => {

  const [member, setAllMembers] = useState<Member>();
  // const [value, setValue] = useState({
  //   id: 0,
  //   name: "",
  //   email: "",
  //   password: "",
  // });
  const { currentUser } = useContext<any>(AuthContext);
  const { id } = useParams<Params>();

  async function handleGetMember(id:any) {
    try {
      const res = await getMembers(id);
      console.log(res.data);
      setAllMembers(res.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    handleGetMember(id);
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
        <form>
          <Stack spacing={1}>
            <Heading color="red" >
              種目：{member?.name}
            </Heading>
            <Input
              w="100%"
              textAlign="center"
              placeholder="チーム名"
              value={currentUser.name}
              // onChange={(e) => handleChange(e)}
              name="name"
              type="text"
              margin="auto"
              position="relative"
            />
            <Input
              w="100%"
              textAlign="center"
              placeholder="対戦チーム名"
              value={""}
              // onChange={(e) => handleChange(e)}
              name="name"
              type="text"
              margin="auto"
              position="relative"
            />
            <Heading textAlign="center" padding="2%">
              第1複
            </Heading>
            <Select textAlign="center" placeholder='選手の選択' id="first_double_1">
              {member?.members.map((name: string) => (
                <option value={name} key={name}>{name}</option>
              ))}
            </Select>
            <Select textAlign="center" placeholder='選手の選択' id="first_double_2">
              {member?.members.map((name: string) => (
                <option value={name} key={name}>{name}</option>
              ))}
            </Select>
            <Heading textAlign="center" padding="2%">
                第1単
              </Heading>
            <Select textAlign="center" placeholder='選手の選択' id="first_single_1">
              {member?.members.map((name: string) => (
                <option value={name} key={name}>{name}</option>
              ))}
            </Select>
            <Heading textAlign="center" padding="2%">
                第2複
              </Heading>
            <Select  textAlign="center" placeholder='選手の選択' id="second_double_1">
              {member?.members.map((name: string) => (
                <option value={name} key={name}>{name}</option>
              ))}
            </Select>
            <Select w="100%" textAlign="center" placeholder='選手の選択' id="second_double_1" padding="0 0 10px 0">
              {member?.members.map((name: string) => (
                <option value={name} key={name}>{name}</option>
              ))}
            </Select>
            <Button
              padding="10px"
              width="auto"
              fontSize="26px"
              bg="teal"
              color="white"
              type="submit"
            >
              確定
            </Button>
          </Stack>
        </form>
      </Center>
    </Box>
  )
});