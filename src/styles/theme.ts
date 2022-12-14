import {extendTheme} from 'native-base';
import {Theme} from '@react-navigation/native';

export const nativeBaseTheme = extendTheme({
  colors: {
    black: '#3b4044',
    primary: {
      50: '#dbf7ff',
      100: '#aee1ff',
      200: '#7eccff',
      300: '#4db7ff',
      400: '#22a3fe',
      500: '#0e89e5',
      600: '#006bb3',
      700: '#004c81',
      800: '#002e50',
      900: '#001020',
    },
    gray: {
      50: '#f9f9fa',
      100: '#ebeef0',
      200: '#dde1e5',
      300: '#cdd4d9',
      400: '#bcc5cc',
      500: '#a9b5bd',
      600: '#94a2ac',
      700: '#7f8b93',
      800: '#646d74',
      900: '#3b4044',
    },
    blue: {
      50: '#f4faff',
      100: '#dbf1ff',
      200: '#c0e6ff',
      300: '#a3daff',
      400: '#80ccff',
      500: '#57bbff',
      600: '#42a7ec',
      700: '#3890ca',
      800: '#2d71a0',
      900: '#1a435e',
    },
    indigo: {
      50: '#f8f9ff',
      100: '#eaecff',
      200: '#dbdfff',
      300: '#cbd0ff',
      400: '#b9c0ff',
      500: '#a4adff',
      600: '#8c97ff',
      700: '#6e7cff',
      800: '#4657fa',
      900: '#293393',
    },
    violet: {
      50: '#fbf8ff',
      100: '#f2eaff',
      200: '#e9dbff',
      300: '#dfcaff',
      400: '#d4b7ff',
      500: '#c7a1ff',
      600: '#b888ff',
      700: '#a568ff',
      800: '#8642ec',
      900: '#4f278c',
    },
    fuschia: {
      50: '#fef7ff',
      100: '#fde7ff',
      200: '#fbd4ff',
      300: '#f9c0ff',
      400: '#f7a8ff',
      500: '#f48bff',
      600: '#f065ff',
      700: '#db42ec',
      800: '#ae34bb',
      900: '#671f6f',
    },
    pink: {
      50: '#fff7fc',
      100: '#ffe7f5',
      200: '#ffd5ee',
      300: '#ffc1e6',
      400: '#ffa9dd',
      500: '#ff8dd1',
      600: '#ff68c2',
      700: '#ee42a9',
      800: '#bd3586',
      900: '#701f4f',
    },
    red: {
      50: '#fff8f8',
      100: '#ffe8ea',
      200: '#ffd7db',
      300: '#ffc4ca',
      400: '#ffaeb6',
      500: '#ff949f',
      600: '#ff7380',
      700: '#f84557',
      800: '#c53745',
      900: '#752129',
    },
    orange: {
      50: '#fff8f4',
      100: '#ffeadb',
      200: '#ffdac0',
      300: '#ffc8a2',
      400: '#ffb380',
      500: '#ff9a56',
      600: '#eb8641',
      700: '#ca7338',
      800: '#9f5b2c',
      900: '#5e351a',
    },
    yellow: {
      50: '#fffbd5',
      100: '#fff16c',
      200: '#f5e344',
      300: '#e6d640',
      400: '#d5c63b',
      500: '#c3b536',
      600: '#aea230',
      700: '#958b2a',
      800: '#766e21',
      900: '#454013',
    },
    lime: {
      50: '#f0ffd9',
      100: '#c7ff75',
      200: '#aef544',
      300: '#a4e640',
      400: '#98d63c',
      500: '#8bc436',
      600: '#7caf31',
      700: '#6a962a',
      800: '#547621',
      900: '#314513',
    },
    green: {
      50: '#ebffe9',
      100: '#b9ffb1',
      200: '#66ff55',
      300: '#54f143',
      400: '#4edf3e',
      500: '#47cc39',
      600: '#40b733',
      700: '#379d2c',
      800: '#2b7c22',
      900: '#194914',
    },
    teal: {
      50: '#e8fff1',
      100: '#aeffcf',
      200: '#49ff92',
      300: '#43f088',
      400: '#3ede7e',
      500: '#39cb74',
      600: '#33b667',
      700: '#2b9c59',
      800: '#227b46',
      900: '#144829',
    },
    cyan: {
      50: '#e4fffc',
      100: '#9afff5',
      200: '#45f9e8',
      300: '#41ead9',
      400: '#3cd9ca',
      500: '#37c7b9',
      600: '#31b1a5',
      700: '#2a988e',
      800: '#217870',
      900: '#144742',
    },
  },
  components: {
    Button: {
      baseStyle(props) {
        props.rounded = 'full';
        return props;
      },
    },
  },
  config: {
    useSystemColorMode: true,
    accessibleColors: true,
  },
});

export const lightNavigationTheme: Theme = {
  dark: false,
  colors: {
    primary: nativeBaseTheme.colors.primary[600],
    background: nativeBaseTheme.colors.gray[100],
    card: nativeBaseTheme.colors.white,
    text: nativeBaseTheme.colors.gray[900],
    border: nativeBaseTheme.colors.gray[300],
    notification: nativeBaseTheme.colors.red[500],
  },
};

export const darkNavigationTheme: Theme = {
  dark: true,
  colors: {
    primary: nativeBaseTheme.colors.primary[600],
    background: nativeBaseTheme.colors.gray[700],
    card: nativeBaseTheme.colors.gray[900],
    text: nativeBaseTheme.colors.gray[300],
    border: nativeBaseTheme.colors.gray[500],
    notification: nativeBaseTheme.colors.red[500],
  },
};
