import {createGlobalStyle, withTheme} from 'styled-components';

export const lightTheme = {
    body: "#F7FFF7",
};

export const darkTheme = {
    body: "#1E1E1E",
    color: "#F7FFF7",
    border: "#F7FFF7 2px solid",
    buttoncolor: "#303030",
    buttoncolorhover: "#404040",
    buttoncoloractive: "#515151",
    buttonborder: "solid 2px #1E1E1E",
    buttonbordertop: "solid 4px #1E1E1E",
};

export const GlobalStyle = createGlobalStyle`
    .buttonArea{
        background-color: ${props => props.theme.body};
    }
    body {
        background-color: ${props => props.theme.body};
    }
    .container{
        background-color: ${props => props.theme.body};
    }
    .boxLogin{
        background-color: ${props => props.theme.body};
    }
    .loginTitulo{
        color: ${props => props.theme.color};
    }
    .login{
        border: ${props => props.theme.border};
    }
    .buttonOne{
        border-right: ${props => props.theme.buttonborder};
        background-color: ${props => props.theme.buttoncolor};
    }
    .buttonTwo{
        background-color: ${props => props.theme.buttoncolor};
        border-left: ${props => props.theme.buttonborder};
    }
    .buttonThree{
        background-color: ${props => props.theme.buttoncolor};
        border-top: ${props => props.theme.buttonbordertop};
        border-right: ${props => props.theme.buttonborder};
    }
    .buttonFour{
        background-color: ${props => props.theme.buttoncolor};
        border-top: ${props => props.theme.buttonbordertop};
        border-left: ${props => props.theme.buttonborder};
    }
    .top a:hover, .down a:hover{
        background-color: ${props => props.theme.buttoncolorhover};
    }
    .text-button{
        color: ${props => props.theme.color};
    }
    .top a:active, .down a:active{
        background-color: ${props => props.theme.buttoncoloractive};
    }
    
`