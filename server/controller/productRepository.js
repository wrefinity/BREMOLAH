import Product from "../model/product.js"
export const productFinder = async () => {
    const products = await Product.find({});
    return products;
};
export const productFinderById = async id => {
    const product = await Product.findById(id);
    return product;
}
export const productCreator = async payload => {
    const newProduct = await Product.create(payload);
    return newProduct
}
export const productDeletor = async id => {
    const product = await Product.findByIdAndRemove(id);
    return product
}