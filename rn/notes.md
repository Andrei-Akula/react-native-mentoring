# Clone a new exercise project

## 1. copy folders

assets
data
screens
styles

## 2. change the content of app.js


## 3.1 add the following into package.json

    "rnpm": {
      "assets": [
        "./assets/fonts/"
      ]
    },

## 3.2 and run

`react-native link`


## 4. add react-native-vector-icons

`yarn add react-native-vector-icons`
`react-native link react-native-vector-icons`


## 5. Add react-navigation

`yarn add react-navigation`
`yarn add react-native-gesture-handler`
`react-native link react-native-gesture-handler`

## 6. Add buffer

`yarn add buffer`


## FINAL. run

`react-native run-ios --simulator="iPhone 7"`
or
`react-native run-ios --simulator="iPhone 8"`
or just
`react-native run-ios`