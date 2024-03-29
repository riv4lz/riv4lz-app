import * as React from 'react';
import { NavigationContainer, DefaultTheme  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./screens/HomeScreen";
import ChatScreen from "./screens/ChatScreen";
import { useStore } from "./stores/store";
import { useEffect } from "react";
import ChatRoomsScreen from "./screens/ChatRoomsScreen";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from "./screens/ProfileScreen";
import 'localstorage-polyfill';
import LoginScreen from "./screens/LoginScreen";
import TestScreen from "./screens/TestScreen";
import { observer } from "mobx-react";
import ChatRoomsList from "./components/chat/ChatRoomsListComponent";
import EditProfileScreen from "./screens/EditProfileScreen";

const Tab = createBottomTabNavigator();


function App() {
    const {chatStore, authStore} = useStore();


    useEffect(() => {
        chatStore.createHubConnection();
    }, );

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
                {!authStore.signedIn ?
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
                                name="ChatRooms"
                                component={AuthView}
                                options={{
                                    tabBarLabel: 'Chat',
                                    tabBarIcon: ({ color, size }) => (
                                        <MaterialCommunityIcons name="chat" color={color} size={size} />
                                    ),
                                }}
                            />
                            <Tab.Screen
                                name="Profile"
                                component={ProfileView}
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
            <Stack.Screen name="ChatRoomScreen" component={ChatRoomsScreen} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
        </Stack.Navigator>
    );
}

function ProfileView ({ navigation }) {

    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: '#181818' }
            }}>
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
        </Stack.Navigator>
    );
}

export default observer(App);
