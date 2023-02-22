import { StarIcon } from "@chakra-ui/icons";
import { Card, CardBody, Heading } from "@chakra-ui/react";
import React, { useState } from "react";

const TableMenu = () => {
  const [activeStar, setActiveStar] = useState<Boolean>(false);
  console.log("star", activeStar);
  return (
    <div style={{ display: "flex", alignItems: "center", height: "70px" }}>
      <Card shadow="2px">
        <CardBody
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
          }}
        >
          <Heading size="md" color="#001529" margin="0px 5px">
            I'm a Heading
          </Heading>
        </CardBody>
      </Card>
      <Card style={{ marginLeft: "20px" }} shadow="2px">
        <CardBody
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 15,
          }}
        >
          <StarIcon
            style={{ color: activeStar && "#21735E" }}
            onClick={() => setActiveStar(!activeStar)}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default TableMenu;
