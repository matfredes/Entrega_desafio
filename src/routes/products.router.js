const { Router } = require('express')
const ProductManager = require('../managers/ProductManagerMemory.js')

const router = Router()

router.get('/:uid', (req, res) => {
    const { uid } = req.params
    const product = ProductManager.getProductById(+uid)

    res.send(product)
})

router.get('/', (req, res) => {
    const limit = req.query.limit;
    if (limit) {
        const limitValue = parseInt(limit);
        const allProducts = ProductManager.getProducts();
        const limitedProducts = allProducts.slice(0, limitValue);
        res.send(limitedProducts);
        return;
    }

    // Si no se proporciona un valor válido para limit, o es menor o igual a cero, se devuelven todos los productos
    res.send(ProductManager.getProducts());
});


// Create _____________________________________________________________________________
// crear un usuario
router.post('/', (req, res) => {

    const { title, description, price, thumbnail, code, stock, status, category } = req.body;

    // Crear un objeto con los datos
    const newProduct = {
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
        status: status,
        category: category
    };

    const result = ProductManager.addProduct(newProduct);

    if (result === 'Producto agregado') {
        res.status(200).send({
            status: 'success',
            message: result,
            newProduct
        });
    } else {
        res.status(400).send({
            status: 'error',
            message: result
        });
    }
});
// update PUT PATCH _______________________________________________________________________

router.put('/:uid', (req, res) => {

    const productId = parseInt(req.params.pid);
    const updatedProduct = req.body;

    const result = ProductManager.updateProduct(productId, updatedProduct);

    if (result === 'Producto actualizado') {
        res.status(200).send({
            status: 'success',
            message: result
        });
    } else {
        res.status(400).send({
            status: 'error',
            message: result
        });
    }
});

// DELETE 

router.delete('/:uid', (req, res) => {

    const productId = parseInt(req.params.pid);

    const result = ProductManager.deleteProduct(productId);

    if (result === 'Producto eliminado') {
        res.status(200).send({
            status: 'success',
            message: result
        });
    } else {
        res.status(400).send({
            status: 'error',
            message: result
        });
    }
});

module.exports = router