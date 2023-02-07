import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import Colors from "./constants/colors";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {useFonts}  from"expo-font";
import AppLoading from "expo-app-loading";



export default function App() {
  const [userNumber, setUserNumber] = useState(null);
  const [gameIsOver,setGameIsOver]  = useState(true);
  const [guessRounds,setguessRounds] = useState(0);

// Hook to load fonts into your Application 

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  function setUserInputNumber(number) {
    setUserNumber(number);
    setGameIsOver(false);
  }

  function gameIsOverHandler(numberOfRounds) {
    setGameIsOver(true);
    setguessRounds(numberOfRounds)
  }

 function  startNewGameHandler(){
  setGameIsOver(true);
  setUserNumber(null);
  setguessRounds(0);
  }

  // Max Implementation of the Navigation Logic
  // let screen = <StartGameScreen onConfirmNumber={setUserInputNumber} />;

  // if(userNumber){
  //   screen = <GameScreen number={userNumber} onResetGame={resetUserNumber} />;
  // }

  // Render the screen value in your JSX code as {screen}

  // if(gameIsOver){
  //   screen = <GameOverScreen />;
  // }

  return (
    <LinearGradient style={styles.rootScreen} colors={[Colors.primary700,Colors.accent500]}>
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>
          {/* My Implementation of Navigation Logic */}
          {!userNumber && gameIsOver && (
            <StartGameScreen onConfirmNumber={setUserInputNumber} />
          )}
          {userNumber && !gameIsOver &&(
            <GameScreen userNumber={userNumber} onGameOver={gameIsOverHandler}/>
          )}
          {gameIsOver && userNumber && (
            <GameOverScreen  roundsNumber={guessRounds} userNumber={userNumber} onStartNewGame={startNewGameHandler} />
          )}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {

    flex: 1,
  },
  backgroundImage: {
    opacity: 0.3,
  },
});
