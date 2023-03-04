import { AddIcon } from "@chakra-ui/icons";
import { Card, CardBody, Text } from "@chakra-ui/react";

const AddListButton = ({
  setActiveAddList,
  activeAddList,
}: {
  setActiveAddList: React.Dispatch<React.SetStateAction<boolean>>;
  activeAddList: boolean;
}) => {
  return (
    <Card
      onClick={() => setActiveAddList(!activeAddList)}
      w="231px"
      maxH={"60px"}
      style={{ marginLeft: "20px", background: "rgba(204, 204, 204, 0.5)" }}
      shadow="2px"
    >
      <CardBody
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "left",
          paddingTop: 15,
          paddingBottom: 15,
          paddingRight: 30,
          paddingLeft: 30,
          cursor: "pointer",
        }}
      >
        <AddIcon
          w={2.5}
          marginRight={"10px"}
          style={{ color: "whitesmoke", position: "relative" }}
        />
        <Text
          as="b"
          fontSize="sm"
          style={{ color: "whitesmoke", position: "relative" }}
        >
          Add another list
        </Text>
      </CardBody>
    </Card>
  );
};

export default AddListButton;
