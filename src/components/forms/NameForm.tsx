import { Box, Button, Input, Text } from "@chakra-ui/react";
import { FormData } from "../../pages/RegisterPage";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getUserData, updateUserName } from "../../api";
import useToastAlert from "../../customHooks/useToastAlert";

const NameForm = () => {
  const {
    register,
    resetField,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const toast = useToastAlert();
  const { data } = useQuery("userData", getUserData);
  const queryClientUpdate = useQueryClient();
  const updateUserNameMutation = useMutation(updateUserName, {
    onSuccess: () => {},
    onError: () => {
      toast("Something went wrong");
    },
    onSettled: () => {
      queryClientUpdate.invalidateQueries([`userData`]);
    },
  });
  const onTitleSaved = () => {
    resetField("username");
  };

  const onSubmit = () => {
    onTitleSaved();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <Text pt="2" as="b" fontSize="md" color={"gray.700"}>
          Name
        </Text>
        <Input
          style={{ marginTop: "10px" }}
          placeholder={data?.username}
          {...register("username", { required: true })}
          // onClick={() => data && setValue("username", data?.username)}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            updateUserNameMutation.mutate({
              username: event.target.value,
            });
          }}
        />
        {errors.username && <span>This field is required</span>}
      </Box>
      <Button m={3} type="submit" colorScheme="brand">
        Save changes
      </Button>
    </form>
  );
};

export default NameForm;
