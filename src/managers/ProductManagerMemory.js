const fs = require("fs");

class ProductManager {
  constructor() {
    // Inicializamos this.products como un array vacío
    this.products = [];
    // Llamamos a la función asincrónica loadProductsFromFile para cargar productos desde el archivo products.json.
    this.loadProductsFromFile();
  }

  getProducts() {
    return this.products;
  }

  addProduct(product) {
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      return "Campos de producto incompletos";
    }

    const result = this.products.find((prod) => prod.code === product.code);
    if (result) {
      return "El producto con dicho codigo existe, intentelo nuevamente";
    }

    product.id = this.products.length + 1;
    this.products.push(product);
    this.saveProductsToFile(); // Ahora es una función asincrónica
    return "Producto agregado";
  }

  getProductById(pid) {
    const result = this.products.find((prod) => prod.id === pid);
    if (!result) {
      return "No existe dicho producto";
    }
    return result;
  }

  updateProduct(pid, updatedProduct) {
    const index = this.products.findIndex((prod) => prod.id === pid);
    if (index === -1) {
      return "No existe dicho producto";
    }

    this.products[index] = { ...this.products[index], ...updatedProduct };
    this.saveProductsToFile(); // Ahora es una función asincrónica
    return "Producto actualizado";
  }

  deleteProduct(pid) {
    const index = this.products.findIndex((prod) => prod.id === pid);
    if (index === -1) {
      return "No existe dicho producto";
    }

    this.products.splice(index, 1);
    this.saveProductsToFile(); // Ahora es una función asincrónica
    return "Producto eliminado";
  }

  // Guarda productos de manera asincrónica en el archivo products.json
  saveProductsToFile() {
    fs.writeFile(
      "products.json",
      JSON.stringify(this.products),
      "utf-8",
      (err) => {
        if (err) {
          console.error("Error al guardar productos en el archivo", err);
        }
      }
    );
  }

  // Carga productos de manera asincrónica desde el archivo products.json
  loadProductsFromFile() {
    fs.readFile("products.json", "utf-8", (err, fileContents) => {
      if (err) {
        console.error("Error al cargar productos desde el archivo", err);
        return;
      }

      try {
        // Parseamos el contenido del archivo y lo asignamos a this.products
        this.products = JSON.parse(fileContents);
      } catch (error) {
        console.error("Error al parsear el contenido del archivo", error);
      }
    });
  }
}

// Cargo nuevos productos
const products = new ProductManager();
console.log(
  products.addProduct({
    title: "producto 1",
    description: "este es un producto",
    price: 3500,
    thumbnail: "imagen",
    stock: 100,
    code: "abc132",
  })
);
console.log(
  products.addProduct({
    title: "producto 2",
    description: "este es un producto",
    price: 2000,
    thumbnail: "imagen",
    stock: 150,
    code: "abc124",
  })
);
console.log(
  products.addProduct({
    title: "producto 3",
    description: "este es un producto",
    price: 2560,
    thumbnail: "imagen",
    stock: 160,
    code: "abc126",
  })
);
console.log(
  products.addProduct({
    title: "producto 4",
    description: "este es un producto",
    price: 2300,
    thumbnail: "imagen",
    stock: 150,
    code: "abc456",
  })
);
console.log(
  products.addProduct({
    title: "producto 5",
    description: "este es un producto",
    price: 2100,
    thumbnail: "imagen",
    stock: 140,
    code: "abc498",
  })
);
console.log(
  products.addProduct({
    title: "producto 6",
    description: "este es un producto",
    price: 2690,
    thumbnail: "imagen",
    stock: 140,
    code: "abc986",
  })
);
console.log(
  products.addProduct({
    title: "producto 7",
    description: "este es un producto",
    price: 3000,
    thumbnail: "imagen",
    stock: 150,
    code: "abc178",
  })
);
console.log(
  products.addProduct({
    title: "producto 8",
    description: "este es un producto",
    price: 2400,
    thumbnail: "imagen",
    stock: 150,
    code: "abc684",
  })
);
console.log(
  products.addProduct({
    title: "producto 9",
    description: "este es un producto",
    price: 2050,
    thumbnail: "imagen",
    stock: 150,
    code: "abc999",
  })
);
console.log(
  products.addProduct({
    title: "producto 10",
    description: "este es un producto",
    price: 2900,
    thumbnail: "imagen",
    stock: 150,
    code: "abc777",
  })
);

console.log(products.getProductById(1));

console.log(
  products.updateProduct(1, {
    price: 2500,
    stock: 120,
  })
);

console.log(products.getProducts());

module.exports = new ProductManager()