import { TouchableOpacity, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";
import { blurhash, getRoomId } from "../utils/common";
import {
  Timestamp,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const ChatItem = ({ item, router, noBorder, currentUser }) => {
  const [lastMessage, setLastMessage] = useState(undefined);

  useEffect(() => {
    createRoomIfNotExists();

    let roomId = getRoomId(currentUser?.userId, item?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messagesRef = collection(docRef, "messages");
    const q = query(messagesRef, orderBy("createdAt", "desc"));

    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setLastMessage(allMessages[0] ? allMessages[0] : null);
    });
    return unsub;
  }, []);

  // console.log("lasty message", lastMessage);

  const createRoomIfNotExists = async () => {
    //roomId
    let roomId = getRoomId(currentUser?.userId, item?.userId);
    await setDoc(doc(db, "rooms", roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date()),
    });
  };

  const openChatRoom = () => {
    router.push({ pathname: "/ChatRoom", params: item });
  };

  const renderTime = () => {
    return "time";
  };

  const renderLastMessage = () => {
    if (typeof lastMessage == "undefiend") return "Loading...";
    if (lastMessage) {
      if (currentUser.userId == lastMessage?.userId)
        return "You: " + lastMessage?.text;
      return lastMessage?.text;
    } else {
      return "Say Hi 👋";
    }
  };

  return (
    <TouchableOpacity
      onPress={openChatRoom}
      className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2  ${
        noBorder ? "" : "border-b border-b-neutral-200"
      }`}
    >
      {/* <Image
        style={{ height: hp(6), width: hp(6) }}
        source={{ uri: item?.profileUrl }}
        className="rounded-full"
      /> */}
      <Image
        style={{ height: hp(6), width: hp(6), borderRadius: 100 }}
        source={{ uri: item?.profileUrl }}
        placeholder={blurhash}
        transition={500}
      />

      {/* name and last message */}
      <View className="flex-1 gap-1">
        <View className="flex-row justify-between">
          <Text
            style={{ fontSize: hp(1.8) }}
            className="font-semibold text-neutral-800"
          >
            {item?.username}
          </Text>
          <Text
            style={{ fontSize: hp(1.6) }}
            className="font-medium text-neutral-500"
          >
            {renderTime()}
          </Text>
        </View>
        <Text
          style={{ fontSize: hp(1.6) }}
          className="font-medium text-neutral-500"
        >
          {renderLastMessage()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
