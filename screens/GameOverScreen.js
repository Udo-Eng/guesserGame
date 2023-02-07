import { Text, View, StyleSheet, Image,Dimensions } from "react-native";
import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import PrimaryButton from "../components/ui/PrimaryButton";

function GameOverScreen({roundsNumber,userNumber,onStartNewGame}) {




  return (
    <View style={styles.screen}>
      <Title>GAME OVER!!</Title>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/success.png")}
          style={styles.image}
        />
      </View>
      <Text style={styles.summaryText}>
        Your phone needed <Text style={styles.hightlight}>{roundsNumber}</Text> rounds to
        guess number <Text style={styles.hightlight}>{userNumber}</Text>
      </Text>
      <PrimaryButton onPress={onStartNewGame}>
        Start New Game 
      </PrimaryButton>
    </View>
  );

}



const deviceWidth = Dimensions.get("window").width;


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 100,
    paddingTop: 100,
    padding: 24,
    alignItems:"center",
  },
  imageContainer: {
    width: deviceWidth < 380 ? 150 : 250,
    height: deviceWidth < 380 ? 150 : 250,
    borderRadius: deviceWidth < 380 ? 75 : 125,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 24,
    textAlign:"center",
    marginBottom: 24
  },
  hightlight: {
    fontFamily: "open-sans-bold",
    color: Colors.accent500,
  },
});

export default GameOverScreen;
