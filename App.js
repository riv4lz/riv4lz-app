import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer, DefaultTheme  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./screens/HomeScreen";
import ChatScreen from "./screens/ChatScreen";
import {useStore} from "./stores/store";
import {useEffect, useState} from "react";
import ChatRoomsScreen from "./screens/ChatRoomsScreen";
import TitleComponent from "./components/TitleComponent";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from "./screens/ProfileScreen";
import 'localstorage-polyfill';
import {autorun, observe} from "mobx";
import LoginScreen from "./screens/LoginScreen";
import TestScreen from "./screens/TestScreen";

const Tab = createBottomTabNavigator();


function App() {
    const {commentStore, authStore} = useStore();
    const [signedIn, setSignedIn] = useState(false);

    autorun(() => {
        if (authStore.signedIn) {
            console.log("Now I'm hungry!");
            test3();
        } else {
            console.log("I'm not hungry!")
            test4();
        }
    })

    let test3 = () => {
        setSignedIn(true);
    }

    const test4 = () => {
        setSignedIn(false);
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setSignedIn(true);
        }
        commentStore.createHubConnection();
        console.log(commentStore.hubConnection.state);
        console.log("connection in app done")
    }, [authStore.user]);

    const MyTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: '#111111'
        },
    };

    return (
        <NavigationContainer theme={MyTheme}>
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={{
                    tabBarStyle: { backgroundColor: '#181818',
                        borderTopColor: "transparent"},
                    tabBarInactiveTintColor: '#FFFFFF',
                    tabBarActiveTintColor: '#279BBB',
                    headerStyle: {
                        backgroundColor: '#181818',
                    },
                    headerTitleAlign: 'center',
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: "bold",
                        textAlign: "center",
                    },
                    headerShown: false,
                    cardStyle: { backgroundColor: '#181818' },
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="ChatRooms"
                    component={AuthView}
                    options={{
                        tabBarLabel: 'Chat',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="chat" color={color} size={size} />
                        ),
                    }}
                />
                {!signedIn ?
                    ( <Tab.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{
                        tabBarLabel: 'Login',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="login" color={color} size={size} />
                        ),
                    }}
                /> ) : (
                        <>
                            <Tab.Screen
                                name="Profile"
                                component={ProfileScreen}
                                initialParams={{ id: authStore.user.id }}
                                options={{
                                    tabBarLabel: 'Profile',
                                    tabBarIcon: ({ color, size }) => (
                                        <MaterialCommunityIcons name="account" color={color} size={size} />
                                    ),
                                }}
                            />
                            <Tab.Screen
                                name="Logout"
                                component={TestScreen}
                                initialParams={{ id: authStore.user.id }}
                                options={{
                                    tabBarLabel: 'Logout',
                                    tabBarIcon: ({ color, size }) => (
                                        <MaterialCommunityIcons name="logout" color={color} size={size} />
                                    ),
                                }}
                            />
                        </>
                 )}
            </Tab.Navigator>
        </NavigationContainer>
    );
}

function AuthView ({ navigation }) {

    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: '#181818' }
            }}>
            <Stack.Screen name="Chat1" component={ChatRoomsScreen} />
            <Stack.Screen name="Chat2" component={ChatScreen} />
        </Stack.Navigator>
    );
}

export default App;
