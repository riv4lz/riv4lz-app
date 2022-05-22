import React, {useState} from 'react';
import { StatusBar } from "expo-status-bar";

import {Formik} from "formik";
import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    RightIcon,
    StyledTextInput,
    StyledInputLabel,
    StyledButton,
    ButtonText,
    Colors,
    MsgBox,
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent, StyledImageContainer, InnerContainerLogin,
} from "../components/styles";

import {View} from 'react-native'

// icons
import {Octicons, Ionicons, Fontisto} from "@expo/vector-icons";
import KeyBoardAvoidingWrapper from "../components/KeyBoardAvoidingWrapper";
import {useStore} from "../stores/store";

// colors
const {brand, darkLight, primary} = Colors;

const LoginScreen = () => {
    const { authStore } = useStore();
    const [hidePassword, setHidePassword] = useState(true);


    const loginRequest = async(user: any) => {
        console.log(authStore.signedIn);
        await authStore.attemptLogin2(user).then(
        );

        if (authStore.user !== null) {
            console.log("YOU ARE LOGGED IN NOW");
            console.log(authStore.user);
        }
    }

    return (
        <KeyBoardAvoidingWrapper>
        <StyledImageContainer source={require("../assets/images/backgrounds/Login_Background.png")}>
            <StatusBar style={"dark"}></StatusBar>
            <InnerContainerLogin>
                <PageLogo resizeMode="contain" source={require("../assets/svgs/logos/Brand_Logo.png")}></PageLogo>
                <PageTitle>Login</PageTitle>
                <SubTitle>"Only the sky is the limit"</SubTitle>
                <Formik
                    initialValues={{email: '', password: ''}}
                    onSubmit={(values) => {
                        loginRequest(values).then(console.log("fisk"));
                    }}
                >
                    {({handleChange, handleBlur, handleSubmit, values}) => <StyledFormArea>
                        <MyTextInput
                            label={"Email Address"}
                            icon={"mail"}
                            placeholder={"andy@gmail.com"}
                            placerholderTextColor={darkLight}
                            onChangeText={handleChange("email")}
                            onBlur={handleBlur("email")}
                            value={values.email}
                            keyboardType={"email-address"}
                        />
                        <MyTextInput
                            label={"Password"}
                            icon={"lock"}
                            placeholder={"* * * * * * * *"}
                            placerholderTextColor={darkLight}
                            onChangeText={handleChange("password")}
                            onBlur={handleBlur("password")}
                            value={values.password}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                        />
                        <MsgBox>...</MsgBox>
                        <StyledButton onPress={handleSubmit}>
                            <ButtonText>
                                Login
                            </ButtonText>
                        </StyledButton>
                        <Line />
                        <ExtraView>
                            <ExtraText>Don't have an account already? </ExtraText>
                            <TextLink>
                                <TextLinkContent>Signup</TextLinkContent>
                            </TextLink>
                        </ExtraView>
                    </StyledFormArea>}
                </Formik>
            </InnerContainerLogin>
        </StyledImageContainer>
        </KeyBoardAvoidingWrapper>
    )
}

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword,...props}) => {
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

export default LoginScreen;
