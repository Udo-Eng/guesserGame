import { FlatList, StyleSheet, View, Alert, ScrollView } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import InstructionText from "../components/ui/InstructionText";
import Title from "../components/ui/Title";
import { useState, useEffect } from "react";
import Card from "../components/ui/Card";
import NumberContainer from "../components/game/NumberContainer";
import Colors from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "../components/game/GuessLogItem";


// FIRST IMPLEMENTATION OF GUESS SCREEN
// 
// function GameScreen(props) {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.textColor}>Game Screen!</Text>
//       <Text style={styles.textColor}>{`${props.number} was guessed`}</Text>
//       <PrimaryButton onPress={props.onResetGame}>Reset Game</PrimaryButton>
//     </View>
//   );
// }
// 


function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

// A sample guessLogItem component
// function GuessLogItem(guessRound){
//     return <Text>{guessRound.item.value}</Text>
// }

function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setguessRounds] = useState([]);

  //   Run this logic evertime currentGuess Changes
  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  // Reset the state of maxBoundary and MinBoundary when component mounts for the first time
  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  // Function to handle user guesses
  function nextGuessHandler(direction) {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      // Remember to pass an array of objects and not an Object as the third argument to Alert.alert method

      Alert.alert("Don't lie", "You know that this is wrong ...", [
        {
          text: "Sorry",
          style: "cancel",
        },
      ]);

      return;
    }

    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }

    const newRandomNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );

    setCurrentGuess(newRandomNumber);
    // An Alternative Way of creating the data to be added to guessRounds
    // let guessRoundItem = {key: newRandomNumber, value : newRandomNumber }
    setguessRounds((prevGuessRounds) => [newRandomNumber, ...prevGuessRounds]);
  }

  const GuessRoundsLength = guessRounds.length;

  return (
    <View style={styles.screen}>
      <View>
        <Title>Opponent's Guess</Title>
        <NumberContainer>{currentGuess}</NumberContainer>
      </View>
      <Card>
        <InstructionText>Higher or Lower ?</InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              style={styles.buttonText}
              onPress={nextGuessHandler.bind(this, "lower")}
            >
              <Ionicons name="md-remove" size={28} color={Colors.accent500} />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              style={styles.buttonText}
              onPress={nextGuessHandler.bind(this, "greater")}
            >
              <Ionicons name="md-add" size={28} color={Colors.accent500} />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      {/* <ScrollView style={styles.listContainer}> */}
      <FlatList
        style={styles.listContainer}
        data={guessRounds}
        renderItem={(ItemData) => (
          <GuessLogItem
            roundNumber={GuessRoundsLength - ItemData.index}
            guess={ItemData.item}
          />
        )}
        keyExtractor={(item) => item}
      />
      {/* </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 40,
    padding: 24,
    alignItems:"center",
  },
  buttonText: {
    color: Colors.accent500,
    fontSize: 24,
    marginVertical: 6,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
    flex: 1,
    width: "90%"
  },
});

export default GameScreen;
