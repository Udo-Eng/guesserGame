import { View, TextInput, StyleSheet, Alert, Text } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import InstructionText from "../components/ui/InstructionText";
import Card from "../components/ui/Card";
import { useState } from "react";
import Colors from "../constants/colors";
import Title from "../components/ui/Title";

function StartGameScreen(props) {
  const [enteredNumber, setEnteredNumber] = useState("");

  function numberInputHandler(enteredText) {
    setEnteredNumber(enteredText);
  }

  function resetInputHandler() {
    setEnteredNumber("");
  }

  function confirmNumberHandler() {
    const isNumber = Number.isFinite(+enteredNumber);
    const numberValue = +enteredNumber;

    if (isNumber && numberValue > 0 && numberValue < 100) {
      props.onConfirmNumber(numberValue);
    } else {
      // alert the user
      Alert.alert(
        "InValid Number",
        "please enter a  number between 0 and  99",
        [
          {
            text: "Dismiss",
            onPress: resetInputHandler,
            style: "destructive",
          },
        ]
      );

      return;
    }

    // Another way of solving the problem  given by the tutor Max
    // let chosenNumber = parseInt(enteredNumber);

    // if(isNaN(chosenNumber)  || chosenNumber <= 0 || chosenNumber > 99){

    //     // Alert the user

    //     return;
    // }
  }

  return (
    <View style={styles.rootContainer}>
      <Title>Guess my Number</Title>
      <Card>
            <InstructionText>Enter a Number</InstructionText>
            <TextInput
            style={styles.numberInput}
            maxLength={2}
            underlineColorAndroid={"transparent"}
            keyboardType="number-pad"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={numberInputHandler}
            value={enteredNumber}
            />
            <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
            </View>
            <View style={styles.buttonContainer}>
                <PrimaryButton onPress={confirmNumberHandler} >
                Confirm
                </PrimaryButton>
            </View>
            </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
  },
  inputContainer: {
    alignItems: "center",
    // justifyContent:"center",
    marginHorizontal: 24,
    borderRadius: 8,
    padding: 16,
    marginTop: 36,
    backgroundColor: Colors.primary800,
    // IOS Box Shadow property
    shadowColor: "black",
    textShadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.5,
    elevation: 4, //Android Box Shadow property
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    color: Colors.accent500,
    marginVertical: 8,
    marginTop: 0,
    borderColor: Colors.accent500,
    borderBottomWidth: 2,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  buttonContainer: {
    flex: 1,
    height: 50,
  },
});

export default StartGameScreen;
