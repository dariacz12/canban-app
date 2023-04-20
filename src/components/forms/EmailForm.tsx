import { Box, Button, Input, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getUserData, updateUserEmail, updateUserName } from "../../api";
import { useState } from "react";
import useToastAlert from "../../customHooks/useToastAlert";

type EmailForm = {
  email: string;
  newEmail: string;
  newEmail2: string;
};

const EmailForm = () => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<EmailForm>();
  const toast = useToastAlert();
  const { data, refetch } = useQuery("userData", getUserData);
  const queryClientUpdate = useQueryClient();
  const updateUserEmailMutation = useMutation(updateUserEmail, {
    onSuccess: (data) => {
      if (data.status === 200) {
        toast(`Your new email: ${newEmail}`);
      }
    },
    onError: () => {
      toast("Something went wrong");
    },
    onSettled: () => {
      queryClientUpdate.invalidateQueries([`userData`]);
    },
  });

  const onTitleSaved = () => {
    if (data?.email !== checkCurrentEmail) {
      toast("You current email is wrong!");
    } else if (newEmail !== newEmail2) {
      toast("Repeat your new email!");
    } else {
      newEmail2 &&
        updateUserEmailMutation.mutate({
          email: newEmail2,
        });
    }
    resetField("email");
    resetField("newEmail");
    resetField("newEmail2");
  };
  const [checkCurrentEmail, setCheckCurrentEmail] = useState<string>();
  const [newEmail, setNewEmail] = useState<string>();
  const [newEmail2, setNewEmail2] = useState<string>();
  const onSubmit = () => {
    onTitleSaved();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <Text pt="2" as="b" fontSize="md" color={"gray.700"}>
          Change your email
        </Text>
        <Text pt="2" fontSize="sm">
          Current email
        </Text>
        <Input
          style={{ marginTop: "10px" }}
          placeholder="Enter current email"
          {...register("email", {
            required: true,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
            },
          })}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setCheckCurrentEmail(event.target.value);
          }}
        />
        {errors.email?.type === "required" && (
          <span>This field is required</span>
        )}
        {errors.email && <span role="alert">{errors.email.message}</span>}
        <Text pt="2" fontSize="sm">
          New email
        </Text>
        <Input
          style={{ marginTop: "10px" }}
          placeholder="Enter new email"
          {...register("newEmail", {
            required: true,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
            },
          })}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setNewEmail(event.target.value);
          }}
        />
        {errors.email?.type === "required" && (
          <span>This field is required</span>
        )}
        {errors.email && <span role="alert">{errors.email.message}</span>}
        <Text pt="2" fontSize="sm">
          Repeat new email
        </Text>
        <Input
          style={{ marginTop: "10px" }}
          placeholder="Repeat new email"
          {...register("newEmail2", {
            required: true,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
            },
          })}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setNewEmail2(event.target.value);
          }}
        />
        {errors.email?.type === "required" && (
          <span>This field is required</span>
        )}
        {errors.email && <span role="alert">{errors.email.message}</span>}
      </Box>
      <Button m={3} type="submit" colorScheme="brand">
        Save changes
      </Button>
    </form>
  );
};

export default EmailForm;
