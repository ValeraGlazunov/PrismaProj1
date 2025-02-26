// const productService = require('../services/productService')
import { register } from "ts-node"
import productService from "../services/productService"

import express, { Express, Request, Response } from 'express'



function getAllProducts(req:Request, res:Response) {
    const max  = Number(req.query.max)
    const context = productService.getAllProducts(max)
    res.render('products', context)
}

function getProductById(req:Request, res:Response){
    // console.log(req.params.id)
    const id = Number(req.params.id)
    const data = productService.getProductById(id)
    if (id <= data.length){
        res.render('product', data.context)
    } else{
        res.send("ban")
    }
}

function createProduct(req:Request, res:Response){
    const data = req.body
    console.log(data)
    productService.createProduct(data);
    res.send('okay');

}


const productControllers = {
    getAllProducts: getAllProducts,
    getProductById: getProductById,
    createProduct: createProduct
}


exports.register = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = new User ({ username, email, password });
      await user.save();
      res.status(201).json({ message: 'Користувач Зарєєструвався' });
    } catch (error) {
      res.status(400).json({ message: 'Registration failed', error });
    }
  };

export default productControllers