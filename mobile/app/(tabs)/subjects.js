import { BadgeCheck, ChevronDown, ChevronUp } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  TamaguiProvider,
  Theme,
  YStack,
  XStack,
  Text,
  Button,
  H1,
  H2,
  ScrollView,
} from "tamagui";
import { Link } from "expo-router";
import Separator from "../../components/Separator";

const yearData = [
  {
    year: "1ER AÑO",
    subjects: [
      {
        title: "Arquitectura de las Computadoras",
        books: [
          { title: "Intro to Computer Architecture", status: "Disponible" },
          { title: "Intro to Computer Architecture 2", status: "Prestado" },
          { title: "Intro to Computer Architecture 3", status: "Prestado" },
        ],
      },
      {
        title: "Introducción a la Programación",
        books: [],
      },
      { title: "Matemática 1", books: [] },
      { title: "Bases de datos", books: [] },
    ],
  },
  {
    year: "2DO AÑO",
    subjects: [
      {
        title: "Introducción a la Programación",
        books: [
          { title: "Intro to Computer Architecture", status: "Disponible" },
          { title: "Intro to Computer Architecture 2", status: "Prestado" },
          { title: "Intro to Computer Architecture 3", status: "Prestado" },
        ],
      },
      { title: "Matemática 1", books: [] },
      { title: "Bases de datos", books: [] },
    ],
  },
];

const CoursesPage = () => {
  const [yearData, setYearData] = useState([]);

  useEffect(() => {
    fetch(process.env.EXPO_PUBLIC_SERVER_URL + "/biblioteca/carrera/2")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setYearData(data);
      });
  }, []);

  return (
    <ScrollView gap="$4" paddingHorizontal={20} mt="$5">
      <H2 fontWeight="bold">Ingeniería en Sistemas de Información</H2>
      <Separator marginTop={10} marginBottom={40} />
      {yearData &&
        yearData.map((year, index) => (
          <YStack
            key={index}
            gap="$3"
            mb={index < yearData.length - 1 ? "$6" : 0}
          >
            <Text fontSize="$4" fontWeight="bold" color="grey">
              {year.year}
            </Text>
            {year.subjects.map((subject, subjIndex) => (
              <DropdownMenu
                key={subjIndex}
                title={subject.title}
                books={subject.books}
              />
            ))}
          </YStack>
        ))}
    </ScrollView>
  );
};

const DropdownMenu = ({ title, books }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prevState) => {
      console.log("Estado previo: ", !prevState);
      return !prevState;
    });
  };

  return (
    <YStack>
      <Button
        onPress={toggleExpand}
        alignItems="center"
        justifyContent="space-between"
        backgroundColor="rgba(0,0,0,0)"
        p={0}
      >
        <Text fontSize="$6" fontWeight="bold">
          {title}
        </Text>
        {isExpanded && <ChevronUp color="black" size={20} />}
        {!isExpanded && <ChevronDown color="black" size={20} />}
      </Button>
      {isExpanded && books.length > 0 && (
        <YStack gap="$2">
          {books.map((item, index) => (
            <CourseItem key={index} title={item.title} status={item.status} />
          ))}
        </YStack>
      )}
    </YStack>
  );
};

const CourseItem = ({ title, status }) => (
  <Link href={`/`} asChild>
    <Button
      alignItems="center"
      justifyContent="space-between"
      borderWidth={1}
      borderStyle="solid"
      borderColor="rgba(0,0,0,0.2)"
    >
      <Text>{title}</Text>
      {status === 1 && (
        <Text>
          <BadgeCheck size={20} color="green" /> Disponible
        </Text>
      )}
      {status === 0 && (
        <Text>
          <BadgeCheck size={20} color="red" /> Prestado
        </Text>
      )}
    </Button>
  </Link>
);

export default CoursesPage;
