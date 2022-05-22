import styled from 'styled-components/native';
import {View, Image, Text, TextInput , TouchableOpacity} from 'react-native'
import Constants from "expo-constants";
import banner from "../assets/images/backgrounds/Login_Background.png"

const StatusBarHeight = Constants.statusBarHeight;

// Colors
export const Colors = {
    primary: "#111111",
    secondary: "#E5E7EB",
    tertiary: "#FFFFFF",
    darkLight: "#9CA3AF",
    brand: "#279BBB",
    green: "#10B981",
    red: "#EF4444",
    grey: "#181818",
};

const {primary, secondary, tertiary, darkLight, brand, green , red, grey} = Colors;

export const StyledImageContainer = styled.ImageBackground`
  flex: 1;
  padding: ${StatusBarHeight}px;
  background-size: cover;
  background-position: center;
`;

export const StyledContainer = styled.View`
  flex: 1;
  padding: ${StatusBarHeight + 10}px;
  background-color: ${primary};
`;

export const InnerContainerLogin = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
    padding-top: 50px;
    padding-bottom: 50px;
`;

export const InnerContainer = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
`;

export const PageLogo = styled.Image`
    width: 200px;
    height: 100px;
`;

export const PageTitle = styled.Text`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: ${brand}
  padding: 10px;
`;

export const SubTitle = styled.Text`
    font-size: 18px;
    margin-bottom: 20px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${tertiary};
    font-style: italic;
`;

export const StyledFormArea = styled.View`
    width: 90%;
`;

export const StyledTextInput = styled.TextInput`
    background-color: ${secondary};
    padding: 15px;
    padding-left: 55px;
    padding-right: 55px;
    border-radius: 5px;
    font-size: 16px;
    height: 60px;
    margin-vertical: 3px;
    margin-bottom: 10px;
    color: ${primary}
`;

export const StyledInputLabel = styled.Text`
    color:${tertiary};
    font-size: 13px;
    text-align: left;
`;

export const LeftIcon = styled.View`
    left: 15px;
    top: 38px;
    position: absolute;
    z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
    right: 15px;
    top: 38px;
    position: absolute;
    z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
    padding: 15px;
    background-color: ${brand};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-vertical: 5px;
    height: 60px;

    ${(props) => props.google == true && `
        background-color: ${green};
        flex-direction: row;
        justify-content: center;
    `}
`;

export const ButtonText = styled.Text`
  color: ${primary};
  font-size: 16px;

  ${(props) => props.google == true && `
        padding: 5px;
    `}
`;

export const MsgBox = styled.Text`
    text-align: center;
    font-size: 13px;
`;

export const Line = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${darkLight}
    margin-vertical: 10px;
`;

export const ExtraView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

export const ExtraText = styled.Text`
  justify-content: center;
  align-content: center;
  color: ${tertiary};
  font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export const TextLinkContent = styled.Text`
    color: ${brand};
    font-size: 15px;
`;

export const RoomsButtonsView = styled.FlatList`
  border: 1px solid red;
`;

export const RoomButtons = styled.TouchableOpacity`
    width: 75px;
    height: 75px;
`;

export const RoomButtonsImage = styled.ImageBackground`
    flex: 1;
    border-radius: 75px;
`;

// chat page

export const ChatContainer = styled.ScrollView`
  width: 100%;
  height: 600px;
`;

export const ChatFrame = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
  margin-left: 22px;
`;

export const ChatInnerFrame = styled.View`
  flex-direction: column;
  margin-left: 10px;
`;



export const ProfileImage = styled.Image`
  width: 50px;
  height: 50px;
  align-self: center;
  right: 2px;
`;

export const UserName = styled.Text`
  color: ${tertiary};
  font-weight: bold;
`;

export const Message = styled.Text`
  color: ${tertiary};
  max-width: 200px;
  right: 2px;
`;

export const SendIcon = styled.TouchableOpacity`
    right: 15px;
    bottom: 22px;
    position: absolute;
    z-index: 1;
`;

export const MessageInput = styled.TextInput`
    background-color: ${secondary};
    padding: 15px;
    padding-left: 55px;
    padding-right: 55px;
    border-radius: 5px;
    font-size: 16px;
  
    margin-vertical: 3px;
    margin-bottom: 10px;
    color: ${primary}
    width: 100%;
`;

export const StyledContainerChat = styled.View`
  flex: 1;
  padding-top: ${StatusBarHeight + 10}px;
  background-color: ${primary};
`;

export const BackIcon = styled.TouchableOpacity`
    top: 15px;
    margin-left: 20px;
    margin-right: 20px;
`;

export const ChatHeaderContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-content: center;
  height: 65px;
  margin-bottom: 20px;
  background-color: ${grey};
`;

export const PageTitleChat = styled.Text`
  font-size: 30px;
  text-align: left;
  font-weight: bold;
  color: ${tertiary}
  padding: 10px;
`;

export const Test = styled.View`
  width: 100%;
`;
