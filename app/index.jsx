import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";

const StartPage = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" />
    </View>
  );
};

export default StartPage;

const styles = StyleSheet.create({});
