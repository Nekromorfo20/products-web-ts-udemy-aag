import { coerce, safeParse, number, parse } from "valibot"
import axios from "axios"
import { DrafProductSchema, ProductSchema, ProductsSchema, TProduct } from "../types"
import { toBoolean } from "../utils"

type TProductData = {
    [k: string]: FormDataEntryValue
}

export const addProduct = async (data : TProductData) => {
    try {
        const result = safeParse(DrafProductSchema, {
            name: data.name,
            price: +data.price
        })
        
        if(result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })

        } else {
            throw new Error("Datos no válidos")
        }

    } catch(e) {
        console.log(e)
    }
}

export const getProducts = async () => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const { data } = await axios(url)
        const result = safeParse(ProductsSchema, data.data)
        if(result.success) {
            return result.output
        } else {
            throw new Error("Hubo un error")
        }

    } catch (e) {
        console.log(e)
    }
}

export const getProductById = async (id : TProduct["id"]) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const { data } = await axios(url)
        const result = safeParse(ProductSchema, data.data)
        if(result.success) {
            return result.output
        } else {
            throw new Error("Hubo un error")
        }

    } catch (e) {
        console.log(e)
    }
}

export const updateProduct = async (data : TProductData, id : TProduct["id"]) => {
    try {
        const NumberSchema = coerce(number(), Number)

        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: parse(NumberSchema, data.price),
            availability: toBoolean(data.availability.toString())
        })

        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
            await axios.put(url, result.output)
        }

    } catch (e) {
        console.log(e)
    }
}

export const deleteProduct = async (id : TProduct["id"]) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.delete(url)
    } catch (e) {
        console.log(e)
    }
}

export const updateProductAvailability = async (id : TProduct["id"]) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url)
    } catch (e) {
        console.log(e)
    }
}