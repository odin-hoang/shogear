"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from ".src/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import ImageUploader from "../ImageUploader";
import { ProductInformationValidation } from "../../lib/validation";
import { useNavigate } from "react-router-dom";
type ProductInformationProps = {
  action?: string;
};
const ProductInformationForm = ({ action = "Create" }: ProductInformationProps) => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof ProductInformationValidation>>({
    resolver: zodResolver(ProductInformationValidation),
  });
  async function onSubmit(values: z.infer<typeof ProductInformationValidation>) {
  }

  return (
    <div></div>
    // <Form {...form}>
    //   <form onSubmit={form.handleSubmit(onSubmit)}>
    //     <div className="flex flex-col lg:flex-row gap-10  w-full">
    //       <div className="flex flex-col gap-9 w-full">
    //         <FormField
    //           control={form.control}
    //           name="productName"
    //           render={({ field }) => (
    //             <FormItem>
    //               <FormLabel className=" small-medium">Product Name</FormLabel>
    //               <FormControl>
    //                 <Input
    //                   {...field}
    //                   type="text"
    //                   placeholder="Full Name"
    //                   className="h-10 small-regular  border-gray-1 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 "
    //                 />
    //               </FormControl>
    //               <FormMessage className="text-red" />
    //             </FormItem>
    //           )}
    //         />
    //         <FormField
    //           control={form.control}
    //           name=""
    //           render={({ field }) => (
    //             <FormItem>
    //               <FormLabel className=" small-medium ">Job Position</FormLabel>
    //               <FormControl>
    //                 <Select>
    //                   <SelectTrigger className="h-10 small-regular  border-gray-1 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 ">
    //                     <SelectValue placeholder="Seelct job position" />
    //                   </SelectTrigger>
    //                   <SelectContent>
    //                     <SelectItem value="light">Manager</SelectItem>
    //                     <SelectItem value="dark">Teacher</SelectItem>
    //                     <SelectItem value="system">Doctor</SelectItem>
    //                   </SelectContent>
    //                 </Select>
    //               </FormControl>
    //               <FormMessage className="text-red" />
    //             </FormItem>
    //           )}
    //         />
    //         <FormField
    //           control={form.control}
    //           name="imageUrl"
    //           render={({ field }) => (
    //             <FormItem>
    //               <FormLabel className=" small-medium ">Photo</FormLabel>
    //               <FormControl>
    //                 <FileUploader fieldChange={field.onChange} mediaUrl={""} />
    //               </FormControl>
    //               <FormMessage className="text-red" />
    //             </FormItem>
    //           )}
    //         />
    //       </div>
    //       <div className="flex flex-col gap-9 w-full">
    //         <FormField
    //           control={form.control}
    //           name="fullname"
    //           render={({ field }) => (
    //             <FormItem>
    //               <FormLabel className=" small-medium ">Phone Number</FormLabel>
    //               <FormControl>
    //                 <Input
    //                   {...field}
    //                   type="text"
    //                   placeholder="Full Name"
    //                   className="h-10 small-regular  border-gray-1 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 "
    //                 />
    //               </FormControl>
    //               <FormMessage className="text-red" />
    //             </FormItem>
    //           )}
    //         />
    //         <FormField
    //           control={form.control}
    //           name="department"
    //           render={({ field }) => (
    //             <FormItem>
    //               <FormLabel className=" small-medium ">Department</FormLabel>
    //               <FormControl>
    //                 <Select>
    //                   <SelectTrigger className="h-10 small-regular  border-gray-1 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 ">
    //                     <SelectValue placeholder="Select department" />
    //                   </SelectTrigger>
    //                   <SelectContent>
    //                     <SelectItem value="light">Manager</SelectItem>
    //                     <SelectItem value="dark">Teacher</SelectItem>
    //                     <SelectItem value="system">Doctor</SelectItem>
    //                   </SelectContent>
    //                 </Select>
    //               </FormControl>
    //               <FormMessage className="text-red" />
    //             </FormItem>
    //           )}
    //         />
    //         <FormField
    //           control={form.control}
    //           name="manager"
    //           render={({ field }) => (
    //             <FormItem>
    //               <FormLabel className=" small-medium ">Manager</FormLabel>
    //               <FormControl>
    //                 <Select>
    //                   <SelectTrigger className="h-10 small-regular  border-gray-1 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 ">
    //                     <SelectValue placeholder="Select manager" />
    //                   </SelectTrigger>
    //                   <SelectContent>
    //                     <SelectItem value="light">Manager</SelectItem>
    //                     <SelectItem value="dark">Teacher</SelectItem>
    //                     <SelectItem value="system">Doctor</SelectItem>
    //                   </SelectContent>
    //                 </Select>
    //               </FormControl>
    //               <FormMessage className="text-red" />
    //             </FormItem>
    //           )}
    //         />
    //         <FormField
    //           control={form.control}
    //           name="email"
    //           render={({ field }) => (
    //             <FormItem>
    //               <FormLabel className=" small-medium ">Email</FormLabel>
    //               <FormControl>
    //                 <Input
    //                   {...field}
    //                   type="text"
    //                   placeholder="employee@gmail.com"
    //                   className="h-10 small-regular  border-gray-1 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 "
    //                 />
    //               </FormControl>
    //               <FormMessage className="text-red" />
    //             </FormItem>
    //           )}
    //         />
    //         <FormField
    //           control={form.control}
    //           name="tags"
    //           render={({ field }) => (
    //             <FormItem>
    //               <FormLabel className=" small-medium ">
    //                 Add Tags(separated by comma ",")
    //               </FormLabel>
    //               <FormControl>
    //                 <Input
    //                   {...field}
    //                   type="text"
    //                   placeholder="Art, Expression, Learn"
    //                   className="h-10 small-regular  border-gray-1 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 "
    //                 />
    //               </FormControl>
    //               <FormMessage className="text-red" />
    //             </FormItem>
    //           )}
    //         />
    //       </div>
    //     </div>
    //     <div className="flex gap-4 mb-5 items-center justify-end">
    //       <Button
    //         type="submit"
    //         className="shad-button_primary bg-primary-2 hover:bg-primary-3 whitespace-nowrap"
    //       >
    //         {/* {isLoadingCreate || (isLoadingUpdate && "Loading...")} */}
    //         {action} Save
    //       </Button>
    //     </div>
    //   </form>
    // </Form>
  );
};

export default ProductInformationForm;
