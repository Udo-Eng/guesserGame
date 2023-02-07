import { View, Text, StyleSheet,Dimensions } from "react-native";
import Colors from "../../constants/colors";

function NumberContainer({ children }) {
  return (
    <View  style={styles.container}>
      <Text style={styles.numberText} > {children}</Text>
    </View>
  );
}

// the Dimensions Object gives you acess to the devices  width

const deviceWidth = Dimensions.get("window").width;

console.log(`My Redmi 8 device width is ${deviceWidth}`);

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.accent500,
    borderRadius: 8,
    padding:  deviceWidth < 450 ? 12 :  24,
    margin: deviceWidth < 450 ? 12 :  24,
    alignItems : "center",
    justifyContent:"center",
  },
  numberText: {
    fontFamily:"open-sans-bold",
    color: Colors.accent500,
    fontSize: 36,
    fontWeight: "bold"
  },
});

export default NumberContainer;
