import React from "react";
import { View, TextInput } from "react-native";

const MultitextInput = (props) => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={2200}
    />
  );
};

export default MultitextInput;