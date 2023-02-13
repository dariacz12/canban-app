import { Box, Button, Input, Text } from "@chakra-ui/react";
import { FormData } from "../../pages/RegisterPage";
import { useForm } from "react-hook-form";

const NameForm = () => {
  const {
    register,
    formState: { errors },
  } = useForm<FormData>();
  return (
    <form>
      <Box>
        <Text pt="2" as="b" fontSize="md" color={"gray.700"}>
          Name
        </Text>
        <Input
          style={{ marginTop: "10px" }}
          placeholder="Name"
          {...register("name", { required: true })}
        />
        {errors.name && <span>This field is required</span>}
      </Box>
      <Button m={3} type="submit" colorScheme="brand">
        Save changes
      </Button>
    </form>
  );
};

export default NameForm;
