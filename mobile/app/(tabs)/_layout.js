import { Tabs } from "expo-router";
import {
  Home,
  Search,
  GraduationCap,
  CircleUserRound,
} from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#8B4513" }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <Home color={color} />,
          title: "Inicio",
          headerTitle: "Inicio",
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color }) => <Search color={color} />,
          title: "Buscar",
          headerTitle: "Buscar libros",
        }}
      />
      <Tabs.Screen
        name="subjects"
        options={{
          tabBarIcon: ({ color }) => <GraduationCap color={color} />,
          title: "Cátedras",
          headerTitle: "Cátedras",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => <CircleUserRound color={color} />,
          title: "Perfil",
          headerTitle: "Perfil",
        }}
      />
    </Tabs>
  );
}
