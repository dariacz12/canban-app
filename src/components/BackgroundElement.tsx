import { Card, CardBody, Image } from "@chakra-ui/react";

const BackgroundElement = ({ imageName }: { imageName: string }) => {
  return (
    <Card maxW="2xs" style={{ margin: "20px", display: "flex" }}>
      <CardBody>
        <Image
          src={require(`../photos/${imageName}.jpg`)}
          borderRadius="lg"
          style={{ cursor: "pointer" }}
        />
      </CardBody>
    </Card>
  );
};

export default BackgroundElement;
