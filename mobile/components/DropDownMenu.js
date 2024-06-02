import React, { useState } from 'react';
import { TamaguiProvider, Theme, Stack, YStack, XStack, Text, Button } from 'tamagui';

const DropdownMenu = () => {
  const [isExpanded, setIsExpanded] = useState({
    architecture: false,
    programming: false,
    math: false,
    databases: false,
  });

  const [bookStatus, setBookStatus] = useState({
    book1: 'Disponible',
    book2: 'Prestado',
    book3: 'Prestado',
  });

  const toggleExpand = (category) => {
    setIsExpanded((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  return (
    <TamaguiProvider>
      <Theme name="light">
        <YStack space="$4" padding="$4">
          <Button onPress={() => toggleExpand('architecture')}>
            <Text>Arquitectura de las Computadoras</Text>
          </Button>
          {isExpanded.architecture && (
            <YStack space="$2" paddingLeft="$4">
              <XStack space="$2">
                <Text>Intro to Computer Architecture - </Text>
                <Text color={bookStatus.book1 === 'Disponible' ? 'green' : 'red'}>
                  {bookStatus.book1}
                </Text>
              </XStack>
              <XStack space="$2">
                <Text>Intro to Computer Architecture 2 - </Text>
                <Text color="red">{bookStatus.book2}</Text>
              </XStack>
              <XStack space="$2">
                <Text>Intro to Computer Architecture 3 - </Text>
                <Text color="red">{bookStatus.book3}</Text>
              </XStack>
            </YStack>
          )}

          <Button onPress={() => toggleExpand('programming')}>
            <Text>Introducción a la Programación</Text>
          </Button>
          {isExpanded.programming && (
            <YStack space="$2" paddingLeft="$4">
              <Text>Programming Book 1</Text>
              <Text>Programming Book 2</Text>
            </YStack>
          )}

          <Button onPress={() => toggleExpand('math')}>
            <Text>Matemática 1</Text>
          </Button>
          {isExpanded.math && (
            <YStack space="$2" paddingLeft="$4">
              <Text>Math Book 1</Text>
              <Text>Math Book 2</Text>
            </YStack>
          )}

          <Button onPress={() => toggleExpand('databases')}>
            <Text>Bases de datos</Text>
          </Button>
          {isExpanded.databases && (
            <YStack space="$2" paddingLeft="$4">
              <Text>Database Book 1</Text>
              <Text>Database Book 2</Text>
            </YStack>
          )}
        </YStack>
      </Theme>
    </TamaguiProvider>
  );
};

export default DropdownMenu;