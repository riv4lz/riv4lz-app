import React, { useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";

// styles
import {
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
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

// icons
import KeyBoardAvoidingWrapper from "../components/KeyBoardAvoidingWrapper";
import { useStore } from "../stores/store";
import MyTextInput from "../components/login/MyTextInput";

// colors
const { darkLight } = Colors;

const LoginScreen = () => {
    const { authStore, userStore } = useStore();
    const [hidePassword, setHidePassword] = useState(true);

    // Function to perform login request
    const loginRequest = async(user: any) => {
        await authStore.attemptLogin(user);

        if (authStore.user !== null) {
            console.log(authStore.user.id);
            await userStore.loadUser(authStore.user.id).then(console.log(userStore.user));
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
                        loginRequest(values);
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
export default LoginScreen;
