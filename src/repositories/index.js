import CartRepository from './Cart.repository.js';
import MessageRepository from './Message.repository.js';
import ProductRepository from './Product.repository.js';
import CartManagerDB from '../dao/mongo/carts.manager.js';
import MessagesManagerDB from '../dao/mongo/messages.manager.js';
import ProductsManagerDB from '../dao/mongo/products.manager.js';

const cartManager = new CartManagerDB()
const messageManager = new MessagesManagerDB()
const productManager = new ProductsManagerDB()

export const cartRepository = new CartRepository(cartManager)
export const messageRepository = new MessageRepository(messageManager)
export const productRepository = new ProductRepository(productManager)