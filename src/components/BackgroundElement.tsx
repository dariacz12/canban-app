import { Card, CardBody, Image } from "@chakra-ui/react";

const BackgroundElement = ({
  imageName,
  style,
}: {
  imageName: string;
  style: React.CSSProperties | undefined;
}) => {
  console.log("image", imageName);
  return (
    <Card
      maxW="2xs"
      style={{ maxWidth: "100vw", margin: "20px", display: "flex", ...style }}
    >
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
