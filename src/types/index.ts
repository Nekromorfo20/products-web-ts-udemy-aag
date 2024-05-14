import { object, string, number, boolean, Output, array } from "valibot"

export const DrafProductSchema = object({
    name : string(),
    price : number()
})

export const ProductSchema = object({
    id: number(),
    name : string(),
    price : number(),
    availability : boolean()
})

export const ProductsSchema = array(ProductSchema)
export type TProduct = Output<typeof ProductSchema>