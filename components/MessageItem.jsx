import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const MessageItem = ({ currentUser, message }) => {
  if (currentUser?.userId == message?.userId) {
    //my message
    return (
      <View className="flex-row justify-end mb-2 mr-3">
        <View style={{ width: wp(80) }}>
          <View className="flex self-end p-2 px-3 rounded-2xl bg-white border border-neutral-200">
            <Text style={{ fontSize: hp(1.8) }}>{message?.text}</Text>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={{ width: wp(80) }} className="ml-3 mb-2">
        <View className="flex self-start p-2 px-3 rounded-2xl bg-indigo-300 border border-indigo-400">
          <Text style={{ fontSize: hp(1.7) }}>{message?.text}</Text>
        </View>
      </View>
    );
  }
};

export default MessageItem;
