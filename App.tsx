import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import createSagaMiddleware from "@redux-saga/core";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { applyMiddleware, createStore } from "redux";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { initializeApp } from "firebase/app";
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

const firebaseConfig = {
  apiKey: "AIzaSyABolQk58ARHPgsSAwZ7A-aLkHsKwYUYRk",
  authDomain: "webskitters-rajesh.firebaseapp.com",
  projectId: "webskitters-rajesh",
  storageBucket: "webskitters-rajesh.appspot.com",
  messagingSenderId: "509315313625",
  appId: "1:509315313625:web:ff7e4d62d9e83497a933c8",
  measurementId: "G-2FP8G59WZF",
};
initializeApp(firebaseConfig);

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <NativeBaseProvider>
          <Tab.Navigator>
            <Tab.Screen
              options={{
                title: "Products",
                tabBarIcon: ({ color }) => (
                  <Ionicons name="albums" size={24} color={color} />
                ),
              }}
              name="home"
              component={Products}
            />
            <Tab.Screen
              options={{
                title: "Add Product",
                tabBarIcon: ({ color }) => (
                  <Ionicons name="add-circle" size={24} color={color} />
                ),
              }}
              name="addProduct"
              component={AddProduct}
            />
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
