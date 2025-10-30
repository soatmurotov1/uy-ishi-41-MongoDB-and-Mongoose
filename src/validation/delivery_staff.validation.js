import z from "zod"

export const delivery_straffValidation = z.object({
  name: z.string().nonempty({ message: "name bo'sh bulishi mumkin emas" }),
  phone: z.string().nonempty({ message: "phone bo'sh bulishi mumkin emas" }),
  vehicle_number: z.string().nonempty({ message: "vehicle_number bo'sh bulishi mumkin emas" }),
  district_id: z.string().length(24, { message: "district_id 24 ta bulishi kerak" })
})


export const delivery_staffUpdValidation = z.object({
  name: z.string().min(1, { message: "name bo'sh bo'lishi mumkin emas" }).optional(),
  phone: z.string().min(7, { message: "phone kamida 7 ta belgi bo'lishi kerak" }).optional(),
  vehicle_number: z.string().min(1, { message: "vehicle_number bo'sh bo'lishi mumkin emas" }).optional(),
  district_id: z.string().length(24, { message: "district_id 24 ta bo'lishi kerak" }).optional()
})