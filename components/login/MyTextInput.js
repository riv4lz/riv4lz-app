import {View} from "react-native";
import {Colors, LeftIcon, RightIcon, StyledInputLabel, StyledTextInput} from "../styles";
import {Ionicons, Octicons} from "@expo/vector-icons";

// colors
const {brand, darkLight} = Colors;

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword,...props }) => {

    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? "md-eye-off" : "md-eye"} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    )
}

export default MyTextInput;