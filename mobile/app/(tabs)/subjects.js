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
  SizableText,
} from "tamagui";
import { Link } from "expo-router";
import Separator from "../../components/Separator";
import { useAuth } from "../../context/AuthContext";

const CoursesPage = () => {
  const [yearData, setYearData] = useState([]);
  const [carrera, setCarrera] = useState("");

  const { user } = useAuth();

  useEffect(() => {
    fetch(
      process.env.EXPO_PUBLIC_SERVER_URL + "/biblioteca/carrera/" + user.carrera
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setYearData(data);
      });
  }, []);

  useEffect(() => {
    fetch(process.env.EXPO_PUBLIC_SERVER_URL + "/carrera/" + user.carrera)
      .then((res) => res.json())
      .then((data) => {
        setCarrera(data.carrera);
      });
  });

  return (
    <ScrollView gap="$4" paddingHorizontal={20} mt="$5">
      <H2 fontWeight="bold">{carrera}</H2>
      <Separator marginTop={10} marginBottom={40} />
      {yearData &&
        yearData.map((year, index) => (
          <YStack
            key={index}
            gap="$3"
            mb={index < yearData.length - 1 ? "$6" : 0}
          >
            <SizableText fontSize={20} fontWeight="bold" color="grey">
              {year.year}
            </SizableText>
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
        <SizableText fontSize={20} fontWeight="bold">
          {title}
        </SizableText>
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
      <SizableText>{title}</SizableText>
      {status === 1 && (
        <SizableText>
          <BadgeCheck size={20} color="green" /> Disponible
        </SizableText>
      )}
      {status === 0 && (
        <SizableText>
          <BadgeCheck size={20} color="red" /> Prestado
        </SizableText>
      )}
    </Button>
  </Link>
);

export default CoursesPage;
