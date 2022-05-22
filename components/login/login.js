import React, { useState } from 'react';
import {Button, StyleSheet, View, TextInput, TouchableOpacity, Text} from "react-native";
import {useStore} from "../../stores/store";
import {useNavigation} from "@react-navigation/native";

const Login = () => {
    const { authStore } = useStore();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation();

    const loginRequest = async(user: any) => {
        await authStore.attemptLogin2(user).then(
        );

        if (authStore.user !== null) {
            console.log("YOU ARE LOGGED IN NOW");
            console.log(authStore.user);
            navigation.navigate("Home");
        }
    }

    return (
        <View>
            <TextInput style={styles.input_field}
                       label="Message"
                       value={email}
                       placeholder={"Email"}
                       onChangeText={email => setEmail(email)}
            />
            <TextInput style={styles.input_field}
                       label="Message"
                       value={password}
                       placeholder={"Password"}
                       onChangeText={password => setPassword(password)}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => loginRequest({ email, password })}
            >
                <Text>Sign In</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    input_field: {
        backgroundColor: "#FFFFFF",
        borderRadius: 2,
        paddingLeft: 2,
        width: "90%",
        alignSelf: "center",
        height: 50,
        marginBottom: 20,
    },
    button: {
        width: "90%",
        alignSelf: "center",
        height: 50,
        alignItems: "center",
        backgroundColor: "#0acad2",
        padding: 10,
        justifyContent: "center",

    }
});

export default Login;
