import { StatusBar } from "expo-status-bar";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";

const uri = "https://yellow-glasses-marry.loca.lt";

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log("hi");
    fetch("https://kind-waves-show.loca.lt/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  function setUser() {
    fetch(uri + "/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.log(err));
  }

  function logIn() {
    console.log("logging in");
    fetch(uri + "/login/password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: "gabsplat", password: "123" }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let userData = setUser();
        setData(userData);
      })
      .catch((err) => setData(null));
    setUser();
  }

  function logOut() {
    console.log("logging out");
    fetch(uri + "/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let userData = setUser();
        setData(userData);
      })
      .catch((err) => setData(null));
  }

  function protectedTest() {
    console.log("calling protected url...");
    fetch(uri + "/protectedLink", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => protectedTest()}>
        <Text style={styles.text}>Protected test</Text>
      </Pressable>
      <Text>{data?.username ? data.username : "not logged"}</Text>
      <Pressable style={styles.button} onPress={() => logIn()}>
        <Text style={styles.text}>Log in</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => logOut()}>
        <Text style={styles.text}>Log out</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    width: "80%",
    marginBottom: 10,
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
