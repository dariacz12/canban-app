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
import { useMutation, useQueryClient } from "react-query";
import { updateUserPassword } from "../../api";
import useToastAlert from "../../customHooks/useToastAlert";
type PasswordForm = {
  password: string;
  currentPassword: string;
  passwordConfirmation: string;
};

const PasswordForm = () => {
  const [show, setShow] = useState<Boolean>();
  const handleClick = () => setShow(!show);
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<PasswordForm>();

  const toast = useToastAlert();

  const updateUserEmailMutation = useMutation(updateUserPassword, {
    onSuccess: (data) => {
      if (data.status === 200) {
        toast(`Your password is successfully changed`);
      }
    },
    onError: () => {
      toast("Something went wrong", "danger");
    },
    onSettled: () => {},
  });

  const onSubmit = ({
    password,
    currentPassword,
    passwordConfirmation,
  }: PasswordForm) => {
    updateUserEmailMutation.mutate({
      password,
      currentPassword,
      passwordConfirmation,
    });
    resetField("password");
    resetField("currentPassword");
    resetField("passwordConfirmation");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            {...register("currentPassword", { required: true })}
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
            {...register("passwordConfirmation", { required: true })}
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
