import {StyleSheet, Text, View} from "react-native";
import {observer, useObserver} from "mobx-react";
import {useStore} from "../stores/store";

function TitleComponent() {
    const { chatStore } = useStore();

    return useObserver(() => (
        <Text style={styles.title}>{chatStore.test2.name}</Text>
    ));
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        color: "#FFFFFF",
    },
});

export default observer(TitleComponent);
