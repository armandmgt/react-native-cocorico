import React, { FunctionComponent } from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import colors from '../../../Constants/colors';

interface CustomTextInputProps extends TextInputProps {
  outline?: boolean;
  color?: string;
  valid?: boolean;
  secure?: boolean;
}

const CustomTextInput: FunctionComponent<CustomTextInputProps> = ({
  outline,
  color,
  valid,
  style,
  placeholder,
  secure,
  value,
  onChangeText,
  onEndEditing,
  textContentType,
  keyboardType,
}) => {
  return (
    <View
      style={[
        { borderColor: color },
        styles.root,
        outline && styles.outlinedRoot,
        valid === false && styles.rootBorderInvalid,
        style,
      ]}
    >
      <TextInput
        style={[{ color }, styles.input]}
        placeholder={placeholder}
        autoCapitalize="none"
        secureTextEntry={secure}
        textContentType={textContentType}
        keyboardType={keyboardType}
        selectionColor={color}
        onChangeText={onChangeText}
        onEndEditing={onEndEditing}
        value={value}
      />
      <TextInput style={{ height: 1 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
  },
  rootBorderInvalid: {
    borderColor: colors.alizarin,
  },
  outlinedRoot: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: colors.midnight_blue,
    borderRadius: 5,
  },
  input: {
    flex: 1,
    height: 30,
    fontSize: 15,
    fontWeight: 'normal',
  },
});

export default CustomTextInput;