import React from "react";
import { Card, Text } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

export default function Item(props) {
  const { task, handleRemove } = props;
  const { data } = task;
  return (
    <div className="address-cointainer">
      <Card className="address-item" boxShadow="xs" borderRadius="20px" p="6" rounded="md">
        <div style={{ position: "relative" }}>
          <div className="button-delete" onClick={handleRemove}>
            <DeleteIcon />
          </div>
        </div>
        <Text fontSize={"24px"} as="b">
          {data.title}
        </Text>
        <Text fontSize={"16px"}>{data.description}</Text>
      </Card>
    </div>
  );
}
