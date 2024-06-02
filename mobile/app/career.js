import React, { useState } from 'react';
import { TamaguiProvider, Theme, YStack, XStack, Text, Button, Separator } from 'tamagui';

const CourseItem = ({ title, status }) => (
  <XStack space="$2" alignItems="center" justifyContent="space-between">
    <Text>{title}</Text>
    <Text color={status === 'Disponible' ? 'green' : 'red'}>{status}</Text>
  </XStack>
);

const DropdownMenu = ({ title, items }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <YStack space="$2">
      <Button onPress={toggleExpand} alignItems="center" justifyContent="space-between">
        <Text>{title}</Text>
        <Text>{isExpanded ? '▲' : '▼'}</Text>
      </Button>
      {isExpanded && (
        <YStack space="$2" paddingLeft="$4">
          {items.map((item, index) => (
            <CourseItem key={index} title={item.title} status={item.status} />
          ))}
        </YStack>
      )}
    </YStack>
  );
};

const CoursesPage = ({ career, yearData }) => {
  return (
    <TamaguiProvider>
      <Theme name="light">
        <YStack space="$4" padding="$4">
          <Text fontSize="$6" fontWeight="bold">
            {career}
          </Text>
          {yearData.map((year, index) => (
            <YStack key={index} space="$4">
              <Text fontSize="$5" color="grey">
                {year.year}
              </Text>
              {year.subjects.map((subject, subjIndex) => (
                <DropdownMenu key={subjIndex} title={subject.title} items={subject.items} />
              ))}
              {index < yearData.length - 1 && <Separator />}
            </YStack>
          ))}
        </YStack>
      </Theme>
    </TamaguiProvider>
  );
};

// Main App Component
const App = () => {
  const [career, setCareer] = useState('Lic. en Informática y Desarrollo de Software');
  const [yearData, setYearData] = useState([
    {
      year: '1ER AÑO',
      subjects: [
        {
          title: 'Arquitectura de las Computadoras',
          items: [
            { title: 'Intro to Computer Architecture', status: 'Disponible' },
            { title: 'Intro to Computer Architecture 2', status: 'Prestado' },
            { title: 'Intro to Computer Architecture 3', status: 'Prestado' },
          ],
        },
        { title: 'Introducción a la Programación', items: [] },
        { title: 'Matemática 1', items: [] },
        { title: 'Bases de datos', items: [] },
      ],
    },
    {
      year: '2DO AÑO',
      subjects: [
        { title: 'Introducción a la Programación', items: [] },
        { title: 'Matemática 1', items: [] },
        { title: 'Bases de datos', items: [] },
      ],
    },
  ]);

  return <CoursesPage career={career} yearData={yearData} />;
};

export default App;
