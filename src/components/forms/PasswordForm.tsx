import {
  Box,
  Button,
  Card,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { FormData } from "../../pages/RegisterPage";
import { useForm } from "react-hook-form";
import { useState } from "react";

const PasswordForm = () => {
  const [show, setShow] = useState<Boolean>();
  const handleClick = () => setShow(!show);
  const {
    register,
    formState: { errors },
  } = useForm<FormData>();
  return (
    <form>
      <Box>
        <Text pt="2" as="b" fontSize="md" color={"gray.700"}>
          Change your password
        </Text>
        <Text pt="2" fontSize="sm">
          Current password
        </Text>
        <InputGroup size="md" style={{ marginTop: "10px" }}>
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter current password"
            {...register("password", { required: true })}
          />

          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Text pt="2" fontSize="sm">
          New password
        </Text>
        <InputGroup size="md" style={{ marginTop: "10px" }}>
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter new password"
            {...register("password", { required: true })}
          />

          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Text pt="2" fontSize="sm">
          Repeat new password
        </Text>
        <InputGroup size="md" style={{ margin: "10px 0px" }}>
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Repeat new password"
            {...register("password", { required: true })}
          />

          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </Box>
      <Button m={3} type="submit" colorScheme="brand">
        Save changes
      </Button>
    </form>
  );
};

export default PasswordForm;
