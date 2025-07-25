import React from "react";
import { Text, View, TextInput, Button, ActionSheetIOS } from "react-native";
import { useState, useEffect } from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

const generateSubtractionProblem = () => {
  const num1 = Math.floor(Math.random() * 10); // Generate a random number between 0 and 9
  const num2 = Math.floor(Math.random() * 10); // Generate another random number between 0 and 9, ensure it is less than num1 for subtraction
  if (num1 < num2) {
    return `${num2} - ${num1}`; // Ensure the first number is larger
} else {
    return `${num1} - ${num2}`; // Normal case
  }
};

const generateAdditionProblem = () => {
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  return `${num1} + ${num2}`;
};

const checkAnswer = (problem: string, answer: string) => {
  const [num1, , num2] = problem.split(" ");
  return parseInt(num1) + parseInt(num2) === parseInt(answer);
};

export default function Index() {
  const [currentProblem, setCurrentProblem] = useState(
    generateAdditionProblem()
  );
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [problems, setProblems] = useState<string[]>([]);
  useEffect(() => {
    setCurrentProblem(generateAdditionProblem());
  }, []);

  return (
    <SafeAreaProvider>
    <View
      style={{
        flex: 4,
        justifyContent: "top",
        alignItems: "center",
      }}
    >
      <Stack.Screen
        options={{
          title: "Math Problems",
          headerStyle: { backgroundColor: "#f4511e" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <Text style={{ fontSize: 100, marginVertical: 10 }}>{currentProblem}</Text>
      <View style={{ marginBottom: 20, width: "60%" }}>
        <Button
          title="Generate Subtraction Problem"
          onPress={() => {
            setCurrentProblem(generateSubtractionProblem());
            setUserAnswer("");
            setIsCorrect(false);
          }}
        />
      </View>
      <View style={{ marginBottom: 20, width: "60%" }}>
        <Button
          title="Generate Addition Problem"
          onPress={() => {
            setCurrentProblem(generateAdditionProblem());
            setUserAnswer("");
            setIsCorrect(false);
          }}
        />
      </View>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          width: "60%",
          paddingHorizontal: 10,
          marginBottom: 20,
        }}
        placeholder="Your answer"
        keyboardType="numeric"
        value={userAnswer}
        onChangeText={setUserAnswer}
      />
      <Button
        title="Check Answer"
        onPress={() => {
          if (checkAnswer(currentProblem, userAnswer)) {
            setIsCorrect(true);
            ActionSheetIOS.showActionSheetWithOptions(
              {
                options: ["OK", "Next Problem"],
                cancelButtonIndex: 0,
                title: "Correct!",
              },
              (buttonIndex) => {
                if (buttonIndex === 1) {
                  setCurrentProblem(generateAdditionProblem());
                  setUserAnswer("");
                  setIsCorrect(false);
                }
              }
            );
          } else {
            setIsCorrect(false);
            ActionSheetIOS.showActionSheetWithOptions(
              {
                options: ["Try Again"],
                cancelButtonIndex: 0,
                title: "Incorrect, try again.",
              },
              () => {}
            );
          }
        }}
      />
      {isCorrect && (
        <Text style={{ color: "green", marginTop: 20 }}>Correct!</Text>
      )}
      {!isCorrect && userAnswer && (
        <Text style={{ color: "red", marginTop: 20 }}>
          Incorrect, try again.
        </Text>
      )}
    </View>
    </SafeAreaProvider>
  );
}

