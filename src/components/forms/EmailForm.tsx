import { Box, Button, Input, Text } from "@chakra-ui/react";
import { FormData } from "../../pages/RegisterPage";
import { useForm } from "react-hook-form";

const EmailForm = () => {
  const {
    register,
    formState: { errors },
  } = useForm<FormData>();
  return (
    <form>
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
          {...register("email", {
            required: true,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
            },
          })}
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
          {...register("email", {
            required: true,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
            },
          })}
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
