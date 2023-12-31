import bcrypt from 'bcryptjs'
import { User } from './models/userModel'
import { Product } from './models/productModel'

export const sampleProducts: Product[] = [
  {
    name: 'Nike Slim Shirt',
    slug: 'nike-slim-shirt',
    category: 'Shirts',
    image: '../images/p1.jpg',
    brand: 'Nike',
    price: 120,
    countInStock: 10,
    description: 'High quality shirt',
    rating: 4.5,
    numReviews: 10,
  },
  {
    name: 'Adidas Fit Shirt',
    slug: 'adidas-fit-shirt',
    category: 'Shirts',
    image: '../images/p2.jpg',
    brand: 'Adidas',
    price: 100,
    countInStock: 20,
    description: 'High quality prodcut',
    rating: 4.0,
    numReviews: 10,
  },
  {
    name: 'Lacoste Free Pants',
    slug: 'lacoste-free-pants',
    category: 'Pants',
    image: '../images/p3.jpg',
    brand: 'Lacoste',
    price: 220,
    countInStock: 0,
    description: 'High quality pant',
    rating: 4.8,
    numReviews: 17,
  },
  {
    name: 'Nike Slim Pant',
    slug: 'nike-slim-pant',
    category: 'Pants',
    image: '../images/p4.jpg',
    brand: 'Nike',
    price: 250,
    countInStock: 15,
    description: 'High quality Pant',
    rating: 4.9,
    numReviews: 19,
  },
]

export const sampleUsers: User[] = [
  {
    name: 'Joe',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456'),
    isAdmin: true,
  },
  {
    name: 'John',
    email: 'user@example.com',
    password: bcrypt.hashSync('123456'),
    isAdmin: false,
  },
]
