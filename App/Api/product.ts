export interface ProductsI {
  id: string;
  name: string;
  image: string;
  offerPrice: number;
  price: number;
}

export interface ApiResponseI {
  statusCode: number;
  message: string;
  description: string;
}

const products: ProductsI[] = [
  {
    id: "sdkjbgsjdgbs",
    name: "Keyboard",
    image: "",
    offerPrice: 1350,
    price: 1500,
  },
];

export function getProducts(): Promise<ProductsI[]> {
  return new Promise((resolve, reject) => {
    console.log("Fetching Porikdyc");
    resolve(products);
    // reject("Something Went wrong");
  });
}

export function addProduct(product: ProductsI): Promise<ApiResponseI> {
  return new Promise((resolve, reject) => {
    console.log(product);
    // resolve({
    //   statusCode: 200,
    //   message: "Product added successfully",
    //   description: "",
    // });
    reject("Something went wrong");
  });
}

export function editProduct(product: ProductsI): Promise<ApiResponseI> {
  console.log(product);
  return new Promise((resolve, reject) => {
    resolve({
      statusCode: 200,
      message: "Product edited successfully",
      description: "",
    });
    // reject("Something went wrong");
  });
}

export function deleteProduct(productId: string): Promise<ApiResponseI> {
  return new Promise((resolve, reject) => {
    resolve({ statusCode: 200, message: "Product Deleted", description: "" });
  });
}
