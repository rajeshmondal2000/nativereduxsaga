import {
  View,
  Text,
  VirtualizedList,
  StyleSheet,
  StatusBar,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActionI, StateI } from "../redux";
import { connect } from "react-redux";
import { ProductsI } from "../api/product";
import { Button, Image } from "native-base";

interface ProductListProps {
  products: ProductsI[];
  fetchingError: boolean;
  fetchingErrorMsg: string;
  fetchProducts: () => void;
  deleteProduct: (productId: string) => void;
  navigation: {
    navigate: any;
  };
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  fetchProducts,
  fetchingError,
  fetchingErrorMsg,
  navigation,
  deleteProduct,
}) => {
  useEffect(() => {
    fetchProducts();
  }, []);

  const _editProduct = (productId: string) => {
    navigation.navigate("editproduct", { productId });
  };

  const getItem = (data: ProductsI[], index: number) => data[index];

  const getItemCount = (data: ProductsI) => products.length;

  const Item = ({ product }: { product: ProductsI }) => (
    <View style={{ flexDirection: "row", marginBottom: 12 }}>
      <Image
        source={{ uri: product.image }}
        style={{ borderRadius: 12 }}
        size={"xl"}
      />
      <View style={{ paddingLeft: 12 }}>
        <Text style={{ fontSize: 20 }}>{product.name}</Text>
        <Text>Price - Rs. {product.price}</Text>
        <Text style={{ marginBottom: 12 }}>
          Offer Price - {product.offerprice}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Button colorScheme={"red"} onPress={() => deleteProduct(product.id)}>
            Delete
          </Button>
          <Button
            onPress={() => _editProduct(product.id)}
            colorScheme={"indigo"}
            style={{ marginLeft: 12 }}
          >
            Edit Product
          </Button>
        </View>
      </View>
    </View>
  );

  if (fetchingError) {
    return (
      <View>
        <Text>{fetchingErrorMsg}</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Products
        </Text>
        <SafeAreaView>
          <VirtualizedList
            data={products}
            initialNumToRender={10}
            renderItem={({ item }: { item: ProductsI }) => (
              <Item product={item} />
            )}
            getItem={getItem}
            keyExtractor={(item) => item.id}
            getItemCount={getItemCount}
          />
        </SafeAreaView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  formContainer: {
    paddingTop: 6,
    paddingBottom: 6,
  },
  label: {
    paddingBottom: 6,
    fontWeight: "600",
  },
});

const mapStateToProps = (state: StateI) => {
  return {
    products: state.products.products,
    fetchingError: state.products.fetchingError,
    fetchingErrorMsg: state.products.fetchingErrorMsg,
  };
};

const mapDispatchToProps = (dispatch: (action: ActionI) => void) => {
  return {
    fetchProducts: () =>
      dispatch({ type: "PRODUCT_FETCHING_REQUEST", payload: null }),
    deleteProduct: (productId: string) =>
      dispatch({ type: "PRODUCT_DELETE_REQUEST", payload: productId }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
