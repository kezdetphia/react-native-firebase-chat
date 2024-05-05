import { ScrollView } from "react-native";
import React from "react";
import MessageItem from "./MessageItem";

const MessageList = ({ messages, currentUser }) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 10 }}
    >
      {messages.map((message, index) => (
        <MessageItem key={index} message={message} currentUser={currentUser} />
      ))}
    </ScrollView>
  );
};

export default MessageList;
