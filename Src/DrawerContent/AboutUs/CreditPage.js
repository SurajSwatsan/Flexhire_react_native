import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../Global_CSS/TheamColors";

const CreditPage = () =>{
    return(
      <View style={styles.Container}>
        <Text>Hello</Text>
      </View>
    );
};

const styles = StyleSheet.create({
  Container:{
     marginHorizontal: 12,
        marginVertical: 18,
        backgroundColor:colors.background,
  }
});

export default CreditPage;