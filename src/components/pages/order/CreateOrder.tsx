import { Box, Select } from "@chakra-ui/react";
import { useLocation, useParams } from "react-router-dom";
import { memo, useContext, useEffect, useState, VFC } from "react";
import { getMembers } from "../../../api/order";
import { AuthContext } from "../../../App";
import { Member } from "../../../api/member";
import { OrderForm } from "../../templates/OrderForm";

type Params = {
  id: string;
}

type State = {
  id: number;
  name: string;
};

export const CreateOrder: VFC = memo(() => {

  const [member, setAllMembers] = useState<Member>();
  const { currentUser } = useContext<any>(AuthContext);
  const { id } = useParams<Params>();
  const { state } = useLocation<State>();

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
    // handleGetMember(param.id);
    handleGetMember(id);
  }, []);

  return (
    <Box>
      <Select placeholder='選手名の選択'>
        {member?.member1.map((name: string) => (
          <option value={name} key={name}>{name}</option>
        ))}
      </Select>
    </Box>

  )
});