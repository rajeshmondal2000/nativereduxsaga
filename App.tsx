import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import createSagaMiddleware from "@redux-saga/core";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { applyMiddleware, createStore } from "redux";
import { NavigationContainer } from "@react-navigation/native";
import reducers from "./App/redux";
import productSaga from "./App/saga/productSaga";
import Products from "./App/screens/Products";
import { Provider } from "react-redux";
import { NativeBaseProvider } from "native-base";
import AddProduct from "./App/screens/AddProduct";

const sagaMiddleware = createSagaMiddleware();
const Tab = createMaterialBottomTabNavigator();

const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(productSaga);

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <NativeBaseProvider>
          <Tab.Navigator>
            <Tab.Screen name="home" component={Products} />
            <Tab.Screen name="addProduct" component={AddProduct} />
          </Tab.Navigator>
        </NativeBaseProvider>
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
