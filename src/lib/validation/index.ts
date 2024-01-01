import { z } from "zod";
export const ProductInformationValidation = z.object({
    productName: z.string(),
    description: z.string(),
    
})
