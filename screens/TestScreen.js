import ChatRoomsScreen from "./ChatRoomsScreen";
import ChatScreen from "./ChatScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Button} from "react-native";
import {useEffect} from "react";
import {useStore} from "../stores/store";

function TestScreen({ navigation }) {
    const { authStore } = useStore();

    useEffect(() => {
        authStore.logout();
        navigation.navigate("Home");
    });

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
export default TestScreen;
