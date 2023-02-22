import { Card, FormLabel, Wrap } from "@chakra-ui/react";
import { useState } from "react";
import { Type } from "typescript";
import BackgroundElement from "./BackgroundElement";

const backgroundBoardTable = [
  { id: 1, imageName: "boardelementphototest1", boardName: "Test Board 1" },
  { id: 2, imageName: "boardelementphototest2", boardName: "Test Board 2" },
  { id: 3, imageName: "boardelementphototest3", boardName: "Test Board 3" },
  { id: 4, imageName: "boardelementphototest4", boardName: "Test Board 4" },
  { id: 5, imageName: "boardelementphototest5", boardName: "Test Board 5" },
  { id: 6, imageName: "boardelementphototest6", boardName: "Test Board 6" },
  { id: 7, imageName: "boardelementphototest7", boardName: "Test Board 7" },
  { id: 8, imageName: "boardelementphototest8", boardName: "Test Board 8" },
  { id: 9, imageName: "boardelementphototest9", boardName: "Test Board 9" },
  { id: 10, imageName: "boardelementphototest10", boardName: "Test Board 10" },
  { id: 11, imageName: "boardelementphototest11", boardName: "Test Board 11" },
  { id: 12, imageName: "boardelementphototest12", boardName: "Test Board 12" },
];

const AddBackgroundImage = ({
  onChange,
  imageName,
}: {
  onChange: (imageName: string) => void;
  imageName: string;
}) => {
  return (
    <>
      <FormLabel>Choose Background Image for your Board: </FormLabel>
      <Wrap
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {backgroundBoardTable.map(({ imageName: itemImageName }) => (
          <div
            onClick={() => {
              onChange(itemImageName);
            }}
          >
            <BackgroundElement
              style={{
                backgroundColor:
                  itemImageName === imageName ? "#53735E" : undefined,
              }}
              imageName={itemImageName}
            />
          </div>
        ))}
      </Wrap>
    </>
  );
};

export default AddBackgroundImage;
