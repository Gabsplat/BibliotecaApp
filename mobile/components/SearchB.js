// App.js
import React, { useState } from 'react';
import { Stack, Text } from 'tamagui';
import { SafeAreaView, StyleSheet, TextInput } from 'react-native';

function SearchB(props) {
  const [searchText, setSearchText] = useState('');

  return (
    <Stack f={1} jc="center" ai="center" p="$6" width="100%" height={props.height}>
      <TextInput
        style={styles.input}
        placeholder='Buscar libro...'
        width="100%"
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderColor: "rgba(0,0,0,0.3)",
    borderWidth: 1,
    paddingLeft: 12,
    paddingVertical: 8,
    borderRadius: 4,
    boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"
  },
});

export default SearchB;

