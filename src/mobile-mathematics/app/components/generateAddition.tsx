import React from "react";
import { Text, View, TextInput, Button } from "react-native";
import { useState, useEffect } from "react";

const generateAdditionProblem = () => {
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  return `${num1} + ${num2}`;
};

const checkAnswer = (problem: string, answer: string) => {
  const [num1, , num2] = problem.split(" ");
  return parseInt(num1) + parseInt(num2) === parseInt(answer);
};

export default function AdditionProblem() {
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
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 18, marginVertical: 20 }}>{currentProblem}</Text>
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
          const correct = checkAnswer(currentProblem, userAnswer);
          setIsCorrect(correct);
          if (correct) {
            setProblems([...problems, currentProblem]);
            setCurrentProblem(generateAdditionProblem());
            setUserAnswer("");
          }
        }}
      />
      {isCorrect && <Text style={{ color: "green", marginTop: 20 }}>Correct!</Text>}
    </View>
  );
};