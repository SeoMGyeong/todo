import EmptyList from "@/components/EmptyList";
import InputFAB from "@/components/InputFAB";
import List from "@/components/List";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { nanoid } from "nanoid";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

const ListScreen = () => {
  const [todos, setTodos] = useState([
    { id: "1", task: "리액트 공부하기", isDone: false },
    { id: "2", task: "리액트 복습하기", isDone: false },
    { id: "3", task: "리액트 보기", isDone: false },
    { id: "4", task: "리액트 유튜브로 공부하기", isDone: false },
    { id: "5", task: "리액트 책으로 공부하기", isDone: false },
    { id: "6", task: "리액트 유튜브로 복습하기", isDone: false },
    { id: "7", task: "리액트 뚫어져라 보기", isDone: false },
    { id: "8", task: "리액트 그냥 보기", isDone: false },
    { id: "9", task: "리액트 멋지게 보기", isDone: false },
    { id: "10", task: "리액트 졸면서 보기", isDone: false },
    { id: "11", task: "리액트 제정신으로 보기", isDone: false },
    { id: "12", task: "리액트 맑은 정신으로 보기", isDone: false },
    { id: "13", task: "리액트 밥먹으면서 보기", isDone: false },
    { id: "14", task: "리액트 안경끼고 보기", isDone: false },
    { id: "15", task: "리액트 핸드폰으로 보기", isDone: false },
    { id: "16", task: "리액트 컴퓨터로 보기", isDone: false },
    { id: "17", task: "리액트 멍때리면서 보기", isDone: false },
    { id: "18", task: "리액트 부릅뜬 눈으로 보기", isDone: false },
    { id: "19", task: "리액트 진짜 하기", isDone: false },
    { id: "20", task: "리액트 프로젝트 만들기", isDone: false },
  ]);
  const [isBottom, setIsBottom] = useState(false);
  const bottom = useSafeAreaInsets(); // 안쪽 영역 여백
  const { getItem, setItem } = useAsyncStorage("todos"); // 위쪽의 todos랑 이름 같아야됨

  // 저장하는 함수
  const save = async (data) => {
    try {
      await setItem(JSON.stringify(data)); // json 형식파일을 텍스트형식으로
      setTodos(data);
    } catch (e) {
      Alert.alert("저장실패", "데이터 저장을 실패했습니다.");
    }
  };

  const load = async () => {
    try {
      const data = await getItem(); // 데이터 불러온걸 data라는 변수에 저장
      const todos = JSON.parse(data || "[]"); // stringify로 줬는데 parse로 바꿈
      //     setTodos(todos); // todos는 바로 위에 있는 todos / 오류났는데 이거 없애니까 됨
    } catch (e) {
      Alert.alert("불러오기 실패", "데이터 불러오기를 실패했습니다.");
    }
  };

  const onDelete = (id: string) => {
    const newTodos = todos.filter((item) => item.id !== id); // 해당되는것 외의 것들을 보여줌, id가 다른것들을 보여줌, === 같은거 보여줌
    save(newTodos);
  };

  // 완료된거 다시 미완료로 만들기
  const onToggle = (id: string) => {
    const newTodos = todos.map((item: object) =>
      item.id === id ? { ...item, isDone: !item.isDone } : item
    ); // 전달받은 id값 동일함 ? 동일하면 기존 item 그대로 두고 isDone값 바꾸기
    save(newTodos);
  };

  // load함수 최초 한번 실행할것임. ()=>{},[]
  useEffect(() => {
    load();
  }, []);

  const onInsert = (task: string) => {
    const id = nanoid(21); //  Date.now().toString(); 대신 nanoid(); 사용해도 됨. 대신 모듈 다운받고 import "react-native-get-random-values";import { nanoid } from "nanoid"; 해줘야됨
    const newdata = [{ id, task, isDone: false }, ...todos];
    save(newdata);
  };

  return (
    <View
      style={{
        flex: 1,
        //      paddingTop: 5,
        paddingBottom: bottom,
      }}
    >
      {todos.length ? (
        <List
          data={todos}
          setIsBottom={setIsBottom}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ) : (
        <EmptyList />
      )}
      <InputFAB onInsert={onInsert} isBtm={isBottom} />
    </View>
  ); // onInsert 이벤트 = {onInsert 함수명}
};

export default ListScreen;
