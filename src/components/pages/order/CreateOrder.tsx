import {  Alert, Box, Button, Center, Heading,Input, Radio, RadioGroup, Stack, Text, Table, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { memo, useContext, useEffect, useState, FC } from "react";
import { getMembers, createOrder } from "../../../api/order";
import { AuthContext } from "../../../App";
import { Member } from "../../../types/member";

type Params = {
  id: string;
}

export const CreateOrder: FC = memo(() => {

  const [member, setAllMembers] = useState<Member>();            // メンバー全部受け取る。membersは配列
  const [error_point, setErrorPoint] = useState<string>('');     // 正しく入力されていない部分を判定。error_pointは初め空文字でsetErrorPointFuncで値がセットされる。error_pointに入るのは〇〇を正しく選択してくださいの〇〇の部分。
  const [disabled, setDisableSubmit] = useState<boolean>(true);  // getChecked〇〇系の関数の状態でtrue/false変わるここがfalseになったら「確定」ボタン押せるようになる。初期値はtrue
  const { currentUser } = useContext<any>(AuthContext);          // ログイン中のユーザの情報が取れる。App.tsxで定義されているグローバル変数のように使えるもの
  const { id } = useParams<Params>();                            // URLに含まれる（このページでいうと/order/create/:team_idのteam_idを取得して変数idとして使える）
  const history = useHistory();
  const location = useLocation<{event_name: string }>();

  const setErrorPointFunc = () => {      // 愚直に書いているがまぁいいか。正しく入力できていない部分を判定して警告出す
    if (getCheckedDouble1() && !getCheckedDouble2() && !getCheckedSingle()){
      return setErrorPoint('第1単 第2複')
    }else if (!getCheckedDouble1() && getCheckedDouble2() && !getCheckedSingle()){
      return setErrorPoint('第1複 第1単')
    }else if (!getCheckedDouble1() && !getCheckedDouble2() && getCheckedSingle()){
      return setErrorPoint('第1複 第2複')
    }else if (getCheckedDouble1() && getCheckedDouble2() && !getCheckedSingle()){
      return setErrorPoint('第1単')
    }else if (!getCheckedDouble1() && getCheckedDouble2() && getCheckedSingle()){
      return setErrorPoint('第1複')
    }else if (getCheckedDouble1() && !getCheckedDouble2() && getCheckedSingle()){
      return setErrorPoint('第2複')
    }else{
      return setErrorPoint('第1複 第1単 第2複')
    }
  }

  const [value, setValue] = useState({
    users_id: currentUser.id,
    teams_id: id,
    event_name: location.state.event_name,
    name: currentUser.name,
    enemy_name: '',
    member1_kind: '',
    member2_kind: '',
    member3_kind: '',
    member4_kind: '',
    member5_kind: '',
    member6_kind: '',
    member7_kind: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const getCheckedDouble1 = () => {
    let length = 8;
    let counter = 0;
    member?.members.length ? length = member?.members.filter(Boolean).length + 1 : length = 8
    // 47,48行目ではチーム人数分ループ回したいけど、memberの変数には初め何も入っていない空状態。なので元はundefinedだから三項演算子で保証してあげる必要がある
    // member?.members.filter(Boolean).lengthで配列内の空文字('')を削除できる
    for (let i = 1; i < length; i++) {
      let btn = document.querySelectorAll<any>(`[name=member${i}_kind]`);    // メンバーの状態を見ていく。typescriptは型定義する必要があるが、とりあえずany型で
      if(btn[0]?.checked) {
        counter++;
      }
    }
    if(counter === 2) {
      return true
    }else{
      return false
    }
  }

  const getCheckedDouble2 = () => {
    let length = 8;
    let counter = 0;
    member?.members.length ? length = member?.members.filter(Boolean).length + 1 : length = 8
    // 47,48行目ではチーム人数分ループ回したいけど、memberの変数には初め何も入っていない空状態。なので元はundefinedだから三項演算子で保証してあげる必要がある
    // member?.members.filter(Boolean).lengthで配列内の空文字('')を削除できる
    for (let i = 1; i < length; i++) {
      let btn = document.querySelectorAll<any>(`[name=member${i}_kind]`);    // メンバーの状態を見ていく。typescriptは型定義する必要があるが、とりあえずany型で
      if(btn[2]?.checked) {
        counter++;
      }
    }
    if(counter === 2) {
      return true
    }else{
      return false
    }
  }

  const getCheckedSingle = () => {
    let length = 8;
    let counter = 0;
    member?.members.length ? length = member?.members.filter(Boolean).length + 1 : length = 8
    // 47,48行目ではチーム人数分ループ回したいけど、memberの変数には初め何も入っていない空状態。なので元はundefinedだから三項演算子で保証してあげる必要がある
    // member?.members.filter(Boolean).lengthで配列内の空文字('')を削除できる
    for (let i = 1; i < length; i++) {
      let btn = document.querySelectorAll<any>(`[name=member${i}_kind]`);   // メンバーの状態を見ていく。typescriptは型定義する必要があるが、とりあえずany型で
      if(btn[1]?.checked) {
        counter++;
      }
    }
    if(counter === 1) {
      return true
    }else{
      return false
    }
  }

  const submitButton = () =>{       // 「確定」が押せる状態かどうかを判定して変数disabledもセットする。
    if (getCheckedDouble1() && getCheckedSingle() && getCheckedDouble2()){
      setDisableSubmit(false)
    }else{
      setDisableSubmit(true)
    }
  }

  async function handleGetMember(id:any) {
    try {
      const res = await getMembers(id);
      console.log(res.data);
      setAllMembers(res.data);
    } catch (e) {
      console.log(e);
    }
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await createOrder(value);
      console.log(res);
      console.log(location.state.event_name);

      if (res.status === 200) {
        history.push('/')
      }
    } catch (e) {
      // console.log(e);
    }
  };

  useEffect(() => {
    setErrorPointFunc();
  })

  useEffect(() => {
    submitButton();
  });

  useEffect(() => {
    getCheckedDouble1();
  });

  useEffect(() => {
    getCheckedSingle();
  });

  useEffect(() => {
    getCheckedDouble2();
  });

  useEffect(() => {
    handleGetMember(id);
  },[]);

  return (
    <Box>
      <form>
        <Stack spacing={1}>
          <Heading color="blue" textAlign="center">
            種目：{member?.eventName}
          </Heading>
          <Input
            w="100%"
            textAlign="center"
            placeholder="チーム名"
            value={currentUser.name}
            name="name"
            type="text"
            margin="auto"
            position="relative"
          />
          <Input
            w="100%"
            textAlign="center"
            placeholder="対戦チーム名"
            value={value.enemy_name}
            onChange={(e) => handleChange(e)}
            name="enemy_name"
            type="text"
          />
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th textAlign='center'>
                    <label>選手名</label>
                  </Th>
                  <Th>
                    <Stack spacing={5} direction='row'>
                      { getCheckedDouble1() ? <Text fontSize='14px'>第1複</Text> : <Text backgroundColor='red' fontSize='14px'>第1複</Text> }   {/* 三項演算子：条件 ？ trueの場合 ： falseの場合 結構使ってる。if/elseで書くよりスッキリする*/}
                      { getCheckedSingle() ? <Text fontSize='14px'>第1単</Text> : <Text backgroundColor='red' fontSize='14px'>第1単</Text> }    {/*三項演算子*/}
                      { getCheckedDouble2() ? <Text fontSize='14px'>第2複</Text>: <Text backgroundColor='red' fontSize='14px'>第2複</Text> }    {/*三項演算子*/}
                      <Text fontSize='14px'>控え</Text>
                    </Stack>
                  </Th>
                </Tr>
              </Thead>
                <Tbody>
                  <Tr>
                    <Center>
                      <Td>{member?.members[0]}</Td>
                    </Center>
                    <Td>
                      <RadioGroup defaultValue=''>
                        <Stack spacing={10} direction='row'>
                          <Radio size='lg' colorScheme='green' name='member1_kind' value='double_1' onChange={(e) => handleChange(e)} />
                          <Radio size='lg' colorScheme='green' name='member1_kind' value='single' onChange={(e) => handleChange(e)} />
                          <Radio size='lg' colorScheme='green' name='member1_kind' value='double_2' onChange={(e) => handleChange(e)} />
                          <Radio size='lg' colorScheme='green' name='member1_kind' value='' onChange={(e) => handleChange(e)} />
                        </Stack>
                      </RadioGroup>
                    </Td>
                  </Tr>
                  <Tr>
                    <Center>
                      <Td>{member?.members[1]}</Td>
                    </Center>
                    <Td>
                      <RadioGroup defaultValue=''>
                        <Stack spacing={10} direction='row'>
                          <Radio size='lg' colorScheme='green' name='member2_kind' value='double_1' onChange={(e) => handleChange(e)} />
                          <Radio size='lg' colorScheme='green' name='member2_kind' value='single' onChange={(e) => handleChange(e)} />
                          <Radio size='lg' colorScheme='green' name='member2_kind' value='double_2' onChange={(e) => handleChange(e)} />
                          <Radio size='lg' colorScheme='green' name='member2_kind' value='' onChange={(e) => handleChange(e)} />
                        </Stack>
                      </RadioGroup>
                    </Td>
                  </Tr>
                  <Tr>
                    <Center>
                      <Td>{member?.members[2]}</Td>
                    </Center>
                    <Td>
                      <RadioGroup defaultValue=''>
                        <Stack spacing={10} direction='row'>
                          <Radio size='lg' colorScheme='green' name='member3_kind' value='double_1' onChange={(e) => handleChange(e)} />
                          <Radio size='lg' colorScheme='green' name='member3_kind' value='single' onChange={(e) => handleChange(e)} />
                          <Radio size='lg' colorScheme='green' name='member3_kind' value='double_2' onChange={(e) => handleChange(e)} />
                          <Radio size='lg' colorScheme='green' name='member3_kind' value='' onChange={(e) => handleChange(e)} />
                        </Stack>
                      </RadioGroup>
                    </Td>
                  </Tr>
                  <Tr>
                    <Center>
                      <Td>{member?.members[3]}</Td>
                    </Center>
                    <Td>
                      <RadioGroup defaultValue=''>
                        <Stack spacing={10} direction='row'>
                          <Radio size='lg' colorScheme='green' name='member4_kind' value='double_1' onChange={(e) => handleChange(e)} />
                          <Radio size='lg' colorScheme='green' name='member4_kind' value='single' onChange={(e) => handleChange(e)} />
                          <Radio size='lg' colorScheme='green' name='member4_kind' value='double_2' onChange={(e) => handleChange(e)} />
                          <Radio size='lg' colorScheme='green' name='member4_kind' value='' onChange={(e) => handleChange(e)} />
                        </Stack>
                      </RadioGroup>
                    </Td>
                  </Tr>
                  <Tr>
                    <Center>
                      <Td>{member?.members[4]}</Td>
                    </Center>
                    <Td>
                      <RadioGroup defaultValue=''>
                        <Stack spacing={10} direction='row'>
                          <Radio size='lg' colorScheme='green' name='member5_kind' value='double_1' onChange={(e) => handleChange(e)} />
                          <Radio size='lg' colorScheme='green' name='member5_kind' value='single' onChange={(e) => handleChange(e)} />
                          <Radio size='lg' colorScheme='green' name='member5_kind' value='double_2' onChange={(e) => handleChange(e)} />
                          <Radio size='lg' colorScheme='green' name='member5_kind' value='' onChange={(e) => handleChange(e)} />
                        </Stack>
                      </RadioGroup>
                    </Td>
                  </Tr>
                  {/*三項演算子*/}
                  {member?.members[5] ?
                    <Tr>
                      <Center>
                        <Td>{member?.members[5]}</Td>
                      </Center>
                      <Td>
                        <RadioGroup defaultValue=''>
                          <Stack spacing={10} direction='row'>
                            <Radio size='lg' colorScheme='green' name='member6_kind' value='double_1' onChange={(e) => handleChange(e)} />
                            <Radio size='lg' colorScheme='green' name='member6_kind' value='single' onChange={(e) => handleChange(e)} />
                            <Radio size='lg' colorScheme='green' name='member6_kind' value='double_2' onChange={(e) => handleChange(e)} />
                            <Radio size='lg' colorScheme='green' name='member6_kind' value='' onChange={(e) => handleChange(e)} />
                          </Stack>
                        </RadioGroup>
                      </Td>
                    </Tr> : <Box></Box>
                  }
                  {/*三項演算子*/}
                  {member?.members[6] ?
                    <Tr>
                      <Center>
                        <Td>{member?.members[6]}</Td>
                      </Center>
                      <Td>
                        <RadioGroup defaultValue=''>
                          <Stack spacing={10} direction='row'>
                            <Radio size='lg' colorScheme='green' name='member7_kind' value='double_1' onChange={(e) => handleChange(e)} />
                            <Radio size='lg' colorScheme='green' name='member7_kind' value='single' onChange={(e) => handleChange(e)} />
                            <Radio size='lg' colorScheme='green' name='member7_kind' value='double_2' onChange={(e) => handleChange(e)} />
                            <Radio size='lg' colorScheme='green' name='member7_kind' value='' onChange={(e) => handleChange(e)} />
                          </Stack>
                        </RadioGroup>
                      </Td>
                    </Tr>
                    : <Box></Box>
                  }
                </Tbody>
            </Table>
          </TableContainer>
          <Button
            padding="10px"
            width="auto"
            fontSize="26px"
            bg="teal"
            color="white"
            type="submit"
            disabled={disabled}
            onClick={(e) => handleSubmit(e)}
          >
            確定
          </Button>
          {/*三項演算子*/}
          { disabled ?
            <Alert flexDirection='column' textAlign='center' status='error'>{error_point}を正しく選択してください</Alert>
          : <Box></Box>
          }
        </Stack>
      </form>
    </Box>
  )
});