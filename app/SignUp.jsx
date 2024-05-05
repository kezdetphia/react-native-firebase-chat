import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Pressable,
  Alert,
  SafeAreaView,
} from "react-native";
import React, { useRef, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { Feather, Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Loading from "../components/Loading";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useAuth } from "../context/authContext";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register } = useAuth();

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const usernameRef = useRef("");
  const profileRef = useRef("");

  const handleRegister = async () => {
    if (
      !emailRef.current ||
      !passwordRef.current ||
      !usernameRef.current ||
      !profileRef.current
    ) {
      Alert.alert("Sign Up", "Please fill all the fields!");
      return;
    }
    //register process
    setLoading(true);

    let res = await register(
      emailRef.current,
      passwordRef.current,
      usernameRef.current,
      profileRef.current
    );
    setLoading(false);

    console.log("got result from signuppage :", res);
    if (!res.success) {
      Alert.alert("Sign up", res.msg);
    }
  };
  return (
    <KeyboardAwareScrollView className="flex-1" extraScrollHeight={120}>
      <SafeAreaView>
        <StatusBar style="dark" />
        <View
          style={{ paddingTop: hp(7), paddingHorizontal: wp(5) }}
          className="flex-1 gap-12"
        >
          {/* sign uin image */}
          <View className="items-center">
            <Image
              style={{ height: hp(20) }}
              resizeMode="contain"
              source={require("../assets/images/register.png")}
            />
          </View>

          <View className="gap-10">
            <Text
              style={{ fontSize: hp(4) }}
              className="font-bold tracking-wider text-center text-neutral-800"
            >
              Register
            </Text>
            {/* inputs */}
            <View className="gap-4">
              <View
                style={{ height: hp(7) }}
                className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl "
              >
                <Feather name="user" size={hp(2.7)} color="gray" />
                <TextInput
                  autoCorrect={false}
                  onChangeText={(value) => (usernameRef.current = value)}
                  style={{ fontSize: hp(2) }}
                  className="flex-1 font-semibold text-neutral-700"
                  placeholder="Username"
                  placeholderTextColor={"gray"}
                />
              </View>
              <View
                style={{ height: hp(7) }}
                className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl "
              >
                <Octicons name="mail" size={hp(2.7)} color="gray" />
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={(value) => (emailRef.current = value)}
                  style={{ fontSize: hp(2) }}
                  className="flex-1 font-semibold text-neutral-700"
                  placeholder="Email address"
                  placeholderTextColor={"gray"}
                />
              </View>
              <View
                style={{ height: hp(7) }}
                className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl "
              >
                <Octicons name="lock" size={hp(2.7)} color="gray" />
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry
                  onChangeText={(value) => (passwordRef.current = value)}
                  style={{ fontSize: hp(2) }}
                  className="flex-1 font-semibold text-neutral-700"
                  placeholder="Password"
                  placeholderTextColor={"gray"}
                />
              </View>
              <View className="gap-3">
                <View
                  style={{ height: hp(7) }}
                  className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl "
                >
                  <Feather name="image" size={hp(2.7)} color="gray" />
                  <TextInput
                    onChangeText={(value) => (profileRef.current = value)}
                    style={{ fontSize: hp(2) }}
                    className="flex-1 font-semibold text-neutral-700"
                    placeholder="Profile URL"
                    placeholderTextColor={"gray"}
                  />
                </View>
              </View>
              {/* //submit */}
              <View>
                {loading ? (
                  <View className="flex-row justify-center">
                    <Loading size={hp(8)} />
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={handleRegister}
                    style={{ height: hp(6.5) }}
                    className="bg-indigo-500 rounded-xl justify-center items-center"
                  >
                    <Text
                      style={{ fontSize: hp(2.7) }}
                      className="text-white font-bold tracking-wider"
                    >
                      Register
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* signUp */}
              <View className="flex-row justify-center">
                <Text
                  style={{ fontSize: hp(1.8) }}
                  className="font-semibold text-neutral-500"
                >
                  Already have an account? &nbsp;
                </Text>
                <Pressable onPress={() => router.push("SignIn")}>
                  <Text
                    style={{ fontSize: hp(1.8) }}
                    className="font-bold text-indigo-500"
                  >
                    Sign In
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
