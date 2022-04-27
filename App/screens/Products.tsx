import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ProductList from "../components/ProductList";
import EditProduct from "./EditProduct";

const Stack = createStackNavigator();

const Products = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="products" component={ProductList} />
      <Stack.Screen name="editproduct" component={EditProduct} />
    </Stack.Navigator>
  );
};

export default Products;
