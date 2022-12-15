import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { query, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import {
  Grid,
  GridItem,
  Button,
  useColorMode,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Heading,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import Item from "../components/Item";

const HEADER_TEXT = "ghi chú địa điểm";

export function Container() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isNameError, setIsNameError] = useState(false);
  const [isAddressError, setIsAdressError] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    async function queryCollection() {
      const q = query(collection(db, "tasks"));
      onSnapshot(q, (snapshot) => {
        setTasks(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    }
    queryCollection();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      setIsNameError(true);
      return;
    }
    if (!description) {
      setIsAdressError(true);
      return;
    }
    try {
      await addDoc(collection(db, "tasks"), {
        title: title,
        description: description,
        completed: false,
        created: Timestamp.now(),
      });
      setTitle("");
      setDescription("");
    } catch (err) {
      alert(err);
    }
  };

  const handleRemove = async (id) => {
    const taskDocRef = doc(db, "tasks", id);
    try {
      await deleteDoc(taskDocRef);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div style={{ position: "absolute", top: "0", right: "0" }}>
        <Button onClick={toggleColorMode} m="1rem">
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "1rem 0 36px 0",
        }}
      >
        <Heading>{HEADER_TEXT.toUpperCase()}</Heading>
      </div>

      {/* Form Add Address */}
      <div className="address-form">
        <form onSubmit={handleSubmit} className="addTask" name="addTask">
          <FormControl isInvalid={isNameError} isRequired>
            <FormLabel>Tên địa điểm</FormLabel>
            <Input
              h="3rem"
              mb="24px"
              size="md"
              type="text"
              name="title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
              placeholder="Nhập tên địa điểm"
              isInvalid={isNameError}
              errorBorderColor="crimson"
              borderRadius="16px"
            />
          </FormControl>
          <FormControl isInvalid={isAddressError} isRequired>
            <FormLabel>Địa chỉ</FormLabel>
            <Textarea
              h="3rem"
              mb="24px"
              isInvalid={isAddressError}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder="Nhập địa chỉ"
              value={description}
              errorBorderColor="crimson"
              borderRadius="16px"
            ></Textarea>
          </FormControl>
          <Button type="submit" borderRadius="16px" w="100%" h="50px" mb="36px">
            Thêm
          </Button>
        </form>
      </div>

      {/* Render List Address */}
      <div className="address-cotainer">
        <Grid
            templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
            gap={6}
        >
            {tasks.map((task) => (
            <GridItem>
                <Item key={task.id} task={task} handleRemove={() => handleRemove(task.id)}/>
            </GridItem>
            ))}
        </Grid>       
      </div>
    </div>
  );
}
