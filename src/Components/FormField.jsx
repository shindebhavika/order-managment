import React from "react";
import { FormLabel, Input, Text } from "@chakra-ui/react";

const FormField = ({ id, label, type = "text", ...props }) => (
  <>
    <FormLabel htmlFor={id} className="input-label-required">
      {label}
    </FormLabel>
    <Input
      id={id}
      type={type}
      variant="filled"
      borderColor="rgba(97, 78, 78, 0.64)"
      {...props}
    />
  </>
);

export default FormField;
