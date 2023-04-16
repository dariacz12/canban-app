import { CheckIcon, NotAllowedIcon } from "@chakra-ui/icons";
import { useToast, Box } from "@chakra-ui/react";

const useToastAlert = () => {
  const toast = useToast();

  return (title: string, type: "success" | "danger" = "success") =>
    toast({
      position: "top",
      title: title,
      status: "success",
      duration: 5000,
      isClosable: true,

      render: () => (
        <>
          {type === "danger" ? (
            <Box rounded={"md"} color="white" p={3} bg="#e82d2f">
              <NotAllowedIcon w={6} h={6} paddingRight={"7px"} /> {title}
            </Box>
          ) : (
            <Box rounded={"md"} color="white" p={3} bg="#001628">
              <CheckIcon paddingRight={"10px"} />
              {title}
            </Box>
          )}
        </>
      ),
    });
};
export default useToastAlert;
