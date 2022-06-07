import 'localstorage-polyfill';
import {InnerContainer, PageLogo, StyledContainer} from "../components/styles";
import {StatusBar} from "expo-status-bar";

function HomeScreen() {

    return (
        <StyledContainer>
            <StatusBar style={"dark"}></StatusBar>
            <InnerContainer>
                <PageLogo resizeMode="contain" source={require("../assets/svgs/logos/Brand_Logo.png")}></PageLogo>
            </InnerContainer>
        </StyledContainer>
    );
}
export default HomeScreen;
