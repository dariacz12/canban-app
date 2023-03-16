import { Box, Card, CardBody, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
const CardItem = ({ title }: { title: string }) => {
  const [cover, setCover] = useState<Boolean>(false);
  return (
    <Card style={{ margin: "7px 0px" }}>
      <CardBody padding={"0px"}>
        {cover && (
          <Box
            backgroundColor={"#BFBFBF"}
            width={"100%"}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              maxW="150px"
              maxH="150px"
              src={require("../photos/boardelementphototest2.jpg")}
              alt="register photo"
            />
          </Box>
        )}
        <Text padding={"20px"}>{title}</Text>
      </CardBody>
    </Card>
  );
};

export default CardItem;
