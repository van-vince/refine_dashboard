import * as React from "react";
import {
    Box,
    Typography,
    FormControl,
    FormHelperText,
    TextField,
    TextareaAutosize,
    Stack,
    Select,
    MenuItem,
    Button,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    Input,
} from "@mui/material";

import { InvoiceFormProps} from "interfaces/common";
import { invoiceFormValues} from "interfaces/common";
import CustomButton from "./CustomButton";
import { Clear, Edit} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"
import { Control, useFieldArray, useForm, useWatch, } from "react-hook-form";



  const Total = ({ control }: { control: Control<invoiceFormValues> }) => {
    const fieldValues = useWatch({
      name: "invoiceDetails",
      control
    });
    const total = fieldValues.reduce(
      (acc, current) => acc + (current.price || 0) * (current.quantity || 0),
      0
    );
    return <> {total}</>
  };



//   function sumValue(payload: invoiceFormValues["invoiceDetails"]) {
//     let sum = 0;
  
//     for (const field of payload) {
//       sum = field.price * field.quantity;
//     }
  
//     return sum;
//   }
//   function SumAmount({ control }: { control: Control<invoiceFormValues> }) {
//     const fieldValues = useWatch({
//       control,
//       name: "invoiceDetails"
//     });
  
//     return <p>{sumValue(fieldValues)}</p>;
//   }




const InvoiceForm = ({type, formLoading, onFinishHandler,  }: InvoiceFormProps) => {

    const {
        formState: { errors },
        register,
        handleSubmit,
        watch,
        control
    } = useForm<invoiceFormValues>({
        defaultValues: {
          invoiceDetails: [{
            name:'',
            quantity:0,
            price:0,
            sum: 0
          }],
        },
        mode: "onBlur"
  });


    const { fields, append, remove, } = useFieldArray({
        name: "invoiceDetails",
        control,
        
    }); 



    function ccyFormat(num: number) {
    return `${num.toFixed(2)}`;
    }

    const TAX_RATE = 0.07;


//   const addItem = () => {
//     setItems([...items, {  id: uuidv4(), name: "", quantity: 0, price: 0, sum: 0 }]);
//   };


//     // handler change
//     const handlerChange = (event:any, i:any) => {
//         const { name, value } = event.target;
//         const list = [...items];
//         list[i][name] = value;
//         list[i]["sum"] = list[i]["quantity"] * list[i]["price"];
//         setItems(list);
//       };
     // console.log(items)


    // delete product item
    // const deleteItem = (i:any) => {
    //     const inputData = [...items];
    //     inputData.splice(i, 1);
    //     setItems(inputData);
    //     console.log(inputData)
    //   };

   //const deleteItem = (i:any) => {setItems(items.filter((row) => row.i !== i))}
  

      // Calculate invoice total
  //const totalAmount = items.reduce((acc, curr) => acc + curr.sum, 0) 

    return (
        <Box>
            <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#fcfcfc" >
                <form style={{ marginTop: "10px", width: "100%", display: "flex", flexDirection: "column", gap: "20px", }}
                    onSubmit={handleSubmit(onFinishHandler)} >
                    <Typography fontSize={25} fontWeight={700} color="#11142d" textAlign='center'>
                        New invoice
                    </Typography>
                    
                    {/* Add company info */}
                    <Box display='flex' flexDirection={{xs:"column", sm:'row'}} mt='10px'  justifyContent='space-between'>
                        <Stack style={{ flexDirection:'column', gap:'5px'}} >
                        <FormControl>
                            <TextField
                                //fullWidth
                                required
                                placeholder="Company Name"
                                id="outlined-basic"
                                color="info"
                                variant="outlined"
                                {...register("companyDetails.name")}

                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                //minRows={5}
                                required
                                placeholder="Company location"
                                color="info"
                                variant="outlined"
                                {...register("companyDetails.location")}

                            />
                        </FormControl>

                        <FormControl>
                            <TextField
                               // minRows={5}
                                required
                                placeholder="company contact"
                                color="info"
                                {...register("companyDetails.contact")}

                            />
                        </FormControl>
                        </Stack>

                        <Stack >
                        <Typography fontSize={50} fontWeight={900} color="info" 
                        textAlign='center' m={5} > 
                            Invoice 
                        </Typography>
                        </Stack>
                    </Box>

                    {/* Add customer info */}
                    <Box display='flex' flexDirection={{xs:"column", sm:'row'}} mt='20px'  justifyContent='space-between'>
                        <Stack style={{ flexDirection:'column', gap:'5px'}} >
                        <FormControl>
                            <TextField
                                //fullWidth
                                required
                                placeholder="Customer Name"
                                id="outlined-basic"
                                color="info"
                                variant="outlined"
                                {...register("customerDetails.name")}
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                //minRows={5}
                                required
                                placeholder="Customer location"
                                color="info"
                                variant="outlined"
                                {...register("customerDetails.location")}

                            />
                        </FormControl>

                        <FormControl>
                            <TextField
                               // minRows={5}
                                required
                                placeholder="Customer contact"
                                color="info"
                                {...register("customerDetails.contact")}

                            />
                        </FormControl>
                        </Stack>

                        <Stack>
                        <Typography fontSize={25} fontWeight={500} color="info" textAlign='center' mt={5}  mr={5}> 
                            Invoice Date
                        </Typography>
                        <Typography fontSize={20} fontWeight={500} color="info" textAlign='center' mr={5}> 
                            Invoice No.
                        </Typography>
                        </Stack>
                    </Box>
                    
                    {/* Warehouse info */}
                    <Box sx={{alignItems: 'end'}}>
                        <FormControl sx={{ flex: 1 }}>
                            <Select
                                variant="outlined"
                                color="info"
                                displayEmpty
                                //placeholder="Select Warehouse"
                                required
                                inputProps={{ "aria-label": "Without label" }}
                                defaultValue="accessories"
                                {...register("category")}

                            >
                                <MenuItem value="apartment">Airpods</MenuItem>
                                <MenuItem value="villa">Bluetooth</MenuItem>
                                <MenuItem value="farmhouse">Charger</MenuItem>
                                <MenuItem value="condos">Cords</MenuItem>
                                <MenuItem value="townhouse">Townhouse</MenuItem>
                                <MenuItem value="duplex">Headset</MenuItem>
                                <MenuItem value="duplex">Accessories</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
 . . 
                    <Box >
                        <Typography fontSize={30} fontWeight={700} color="info" textAlign='center' >
                            Invoice Items
                        </Typography>
                    </Box>

                    {/* Invoice preview table */}
                    <Box  overflow='auto' >
                    <Table sx={{ maxWidth: { md:'650'}}} >
                        <TableHead>
                            <TableRow sx={{fontSize:200, fontWeight: 500, color:"#11142d"}} >
                                <TableCell align="left">Product Name</TableCell>
                                <TableCell align="left">Quantity</TableCell>
                                <TableCell align="left">Price</TableCell>
                                <TableCell align="left">Sum</TableCell>
                                {/* <TableCell align="left">Clear</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {fields?.map((field, index) => (
                            <TableRow key={field.id} >
                            <TableCell component="th" scope="row">
                                <TextField
                                    type="text"
                                    {...register(`invoiceDetails.${index}.name` as const, {required: true})}
                                    className={errors?.invoiceDetails?.[index]?.name ? "error" : ""}
                                    defaultValue={field.name}
                                />
                            </TableCell>
                            <TableCell component="th" scope="row">
                            <TextField
                                    type="number"
                                    {...register(`invoiceDetails.${index}.price` as const, {valueAsNumber: true,required: true})}
                                    className={errors?.invoiceDetails?.[index]?.price ? "error" : ""}
                                    defaultValue={field.price}
                                />
                            </TableCell>
                            <TableCell component="th" scope="row">
                            <TextField
                                    type="number"
                                    {...register(`invoiceDetails.${index}.quantity` as const, {valueAsNumber: true,required: true})}
                                    className={errors?.invoiceDetails?.[index]?.quantity ? "error" : ""}
                                    defaultValue={field.quantity}
                                />
                            </TableCell>
                            <TableCell align="center" className='amount' >
                                 <input type="hidden" {...register(`invoiceDetails.${index}.sum`)} defaultValue={field.price * field.quantity}/>
                                <Typography fontSize={18} fontWeight={400} textAlign='center' justifyContent='center'>
                                    {field.price * field.quantity}
                                    {/* <SumAmout control={control} /> */}
                                </Typography> 
                            </TableCell>
                            <TableCell align="center">
                                <Clear onClick={() => remove(index)}/></TableCell>
                            </TableRow>
                        ))}
                        <Button style={{margin:'5px', marginTop:'10px', border: '1px solid green', }} 
                            onClick={() => {append({ name: "",  price: 0, quantity: 0, sum:0})}}>
                                Add Item
                        </Button>

                        <TableRow >
                           <TableCell rowSpan={4} />
                           <TableCell colSpan={2}>Subtotal</TableCell>
                           <TableCell align="right" >
                           <input type="hidden" {...register('subtotal')}  />
                                <Typography fontSize={20} fontWeight={500}> <Total control={control}/> </Typography>
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>Tax</TableCell>
                            <TableCell align="right">{`${(0.0 * 100).toFixed(0)} %`}</TableCell>
                            <TableCell align="right" >
                                <input type="hidden" {...register('tax')}  />
                                {ccyFormat(0)}  
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>Discount</TableCell>
                            <TableCell align="right">{`${(0.0 * 100).toFixed(0)} %`}</TableCell>
                            <TableCell align="right">
                            <input type="hidden" {...register('discount')}  />
                                {ccyFormat(0)}
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">
                            <input type="hidden" {...register('total')}  />
                                <Typography fontSize={25} fontWeight={500} ><Total control={control} /></Typography>
                            </TableCell>
                        </TableRow>

                        </TableBody>
                        </Table>
                    </Box>
                    
                    <CustomButton
                        type="submit"
                        title={formLoading ? "Submitting..." : "Submit"}
                        backgroundColor="#475be8"
                        color="#fcfcfc"
                    />
                </form>
            </Box>
        </Box>
    );
};

export default InvoiceForm;




    // <Box>
    // <Table >
    //     <thead>
    //         <tr  >
    //             <th align="left">Product Name</th>
    //             <th align="left">Quantity</th>
    //             <th align="left">Price</th>
    //             <th align="left">Sub Total</th>
    //             <th align="left">Clear</th>
    //         </tr>
    //     </thead>
    //     <tbody>
    //     {items?.map((item, i, id,) => (
    //         <tr key={i}>
    //         <td >
    //             <input
    //                 type="text"
    //                 name="name" 
    //                 onChange={(e) => handlerChange(e,i)}
    //             /> 
    //         </td>
    //         <td >
    //             <input
    //                 type="number"
    //                 name="price" 
    //                 onChange={(e) => handlerChange(e,i)}
    //             /> 
    //         </td>
    //         <td >
    //             <input
    //                 type="number"
    //                 name="quantity" 
    //                 onChange={(e) => handlerChange(e,i)}
    //             /> 
    //         </td>
    //         <td align="center" className='amount'>
    //             <Typography fontSize={18} fontWeight={400} textAlign='center' justifyContent='center'>
    //                 {item.subtotal}
    //             </Typography> 
    //             </td>
    //         <td align="center">
    //             <Clear onClick={() => deleteItem(i)}/></td>
    //         </tr>
    //     ))}
    //     </tbody>
    // </Table>
    // </Box>




//  import { Typography, FormControl, FormHelperText, TextField, TextareaAutosize, 
//      Stack, Select, MenuItem, Table, TableHead, TableRow, TableBody, TableCell, Input
//  } from "@pankod/refine-mui";
// import { useForm } from '@mantine/form';
// import { TextInput, Switch, Group, ActionIcon, Box, Text, Button, Code } from '@mantine/core';
// import { randomId } from '@mantine/hooks';
// import { Clear} from "@mui/icons-material";
// import { v4 as uuidv4 } from "uuid"
// import { useState, useEffect } from "react";
// import { InvoiceProps} from "interfaces/common";
// import { InvoiceDetails } from "pages";

// const InvoiceForm =() =>{

//   const form = useForm({
//     initialValues: {
//         companyDetails: [{ companyName:'', companyLocation:'', companyContact:'' }],
//         customerDetails: [{ customerName:'', customerLocation:'', customerContact:'' }],
//         invoiceDetails: [{ id: uuidv4(), name:'', quantity: 0, price: 0, sum: 0}],
//         subtotal:'',
//         tax:'',
//         discount:'',
//         total:''

//     }
//   });
     
//     const [items, setItems] = useState<any[]>([]);


//     const handlerChange = (event:any, i:any) => {
//         const { name, value } = event.target;
//         const list = [...items];
//         list[i][name] = value;
//         list[i]["sum"] = list[i]["quantity"] * list[i]["price"];
//         setItems(list);
//       };

  


//           // Calculate invoice total
//     const totalAmount = items.reduce((acc, curr) => acc + curr.sum, 0);

//     const sum = form.values.invoiceDetails.reduce((acc, curr) => acc + curr.price, 0);

//     console.log(sum)

//     function ccyFormat(num: number) {
//         return `${num.toFixed(2)}`;
//         }



//   console.log(form.values.invoiceDetails)
 


//   const invoiceList = form.values.invoiceDetails.map((item, index, i) => (
//                 <TableRow key={item.id} >
//                 <TableCell component="th" scope="row">
//                     <TextInput
//                         type="text"
//                         name="name"
//                         {...form.register(`invoiceDetails.${index}.name`)}
//                          onChange={(e) => handlerChange(e,i)}
//                     /> 
//                 </TableCell>
//                 <TableCell component="th" scope="row">
//                     <TextInput
//                         type="number"
//                         name="price"
//                         {...form.register(`invoiceDetails.${index}.price`)}
//                          onChange={(e) => handlerChange(e,i)}
//                     /> 
//                 </TableCell>
//                 <TableCell component="th" scope="row">
//                     <TextInput
//                         type="number"
//                         name="quantity"
//                         {...form.register(`invoiceDetails.${index}.quantity`)}
//                          onChange={(e) => handlerChange(e,i)}
//                     /> 
//                 </TableCell>
//                 <TableCell align="center" className='amount' {...form.register(`invoiceDetails.${index}.sum`)}>
//                     <Typography fontSize={18} fontWeight={400} textAlign='center' justifyContent='center'>
//                         {item.sum}
//                     </Typography> 
//                 </TableCell>
//                 <ActionIcon color="red" onClick={() => form.removeListItem('invoiceDetails', index)}>
//                      <Clear />
//                  </ActionIcon>
//                 </TableRow>
//             ))


//   return (
//     <Box maw={500} mx="auto">
//     {/* Add company info */}
//         <Box display='flex'  mt='10px' >
//             <Stack style={{ flexDirection:'column', gap:'5px'}} >
//             <FormControl>
//                 <TextInput
//                     required
//                     placeholder="Company Name"
//                     id="outlined-basic"
//                     color="info"
//                     {...form.register("companyDetails.companyName")}

//                 />
//             </FormControl>
//             <FormControl>
//                 <TextInput
//                     required
//                     placeholder="Company location"
//                     color="info"
//                     {...form.register("companyDetails.companyLocation")}

//                 />
//             </FormControl>

//             <FormControl>
//                 <TextInput
//                     required
//                     placeholder="company contact"
//                     color="info"
//                     {...form.register("companyDetails.companyContact")}

//                 />
//             </FormControl>
//             </Stack>

//             <Stack >
//             <Typography fontSize={50} fontWeight={900} color="info" 
//             textAlign='center' m={5} display={{xs:'none', md:'block'}}> 
//                 Invoice 
//             </Typography>
//             </Stack>
//         </Box>

//         {/* Add customer info */}
//         <Box display='flex'>
//             <Stack style={{ flexDirection:'column', gap:'5px'}} >
//             <FormControl>
//                 <TextInput
//                     required
//                     placeholder="Customer Name"
//                     id="outlined-basic"
//                     color="info"
//                     {...form.register("customerDetails.customerName")}
//                 />
//             </FormControl>
//             <FormControl>
//                 <TextInput
//                     required
//                     placeholder="Customer location"
//                     color="info"
//                     {...form.register("customerDetails.customerLocation")}

//                 />
//             </FormControl>

//             <FormControl>
//                 <TextInput
//                     required
//                     placeholder="Customer contact"
//                     color="info"
//                     {...form.register("customerDetails.customerContact")}

//                 />
//             </FormControl>
//             </Stack>

//             <Stack>
//             <Typography fontSize={25} fontWeight={500} color="info" textAlign='center' mt={5}  mr={5}> 
//                 Invoice Date
//             </Typography>
//             <Typography fontSize={20} fontWeight={500} color="info" textAlign='center' mr={5}> 
//                 Invoice No.
//             </Typography>
//             </Stack>
//         </Box>
    
//         {/* Warehouse info */}
//         <Box sx={{alignItems: 'end'}}>
//             <FormControl sx={{ flex: 1 }}>
//                 <Select
//                     variant="outlined"
//                     color="info"
//                     displayEmpty
//                     placeholder="Select Warehouse"
//                     required
//                     inputProps={{ "aria-label": "Without label" }}
//                     defaultValue="accessories"
//                     {...form.register("category")}

//                 >
//                     <MenuItem value="apartment">Airpods</MenuItem>
//                     <MenuItem value="villa">Bluetooth</MenuItem>
//                     <MenuItem value="farmhouse">Charger</MenuItem>
//                     <MenuItem value="condos">Cords</MenuItem>
//                     <MenuItem value="townhouse">Townhouse</MenuItem>
//                     <MenuItem value="duplex">Headset</MenuItem>
//                     <MenuItem value="duplex">Accessories</MenuItem>
//                 </Select>
//             </FormControl>
//         </Box>
// . . 
//         <Box >
//             <Typography fontSize={30} fontWeight={700} color="info" textAlign='center' >
//                 Invoice Items
//             </Typography>
//         </Box>

//     <Box >
//         <Table sx={{ maxWidth: { md:'650'}}} >
//             <TableHead>
//                 <TableRow sx={{fontSize:200, fontWeight: 500, color:"#11142d"}} >
//                     <TableCell align="left">Product Name</TableCell>
//                     <TableCell align="left">Quantity</TableCell>
//                     <TableCell align="left">Price</TableCell>
//                     <TableCell align="left">Sum</TableCell>
//                 </TableRow>
//             </TableHead>
//             <TableBody>

//             {invoiceList}

//             <Button onClick={() => form.insertListItem('invoiceDetails', { id: uuidv4(), name: "", quantity: 0, price: 0, sum: 0 })}>
//                 Add Item
//              </Button>

//         <TableRow >
//             <TableCell rowSpan={4} />
//             <TableCell colSpan={2}>Subtotal</TableCell>
//             <TableCell align="right" {...form.register("invoiceDetails.subtotal")}>
//             <Typography fontSize={20} fontWeight={500}> {ccyFormat(totalAmount)}
//             </Typography></TableCell>
//         </TableRow>

//         <TableRow>
//             <TableCell>Tax</TableCell>
//             <TableCell align="right">{`${(0.0 * 100).toFixed(0)} %`}</TableCell>
//             <TableCell align="right" {...form.register("tax")}>{ccyFormat(0)}</TableCell>
//         </TableRow>

//         <TableRow>
//             <TableCell>Discount</TableCell>
//             <TableCell align="right">{`${(0.0 * 100).toFixed(0)} %`}</TableCell>
//             <TableCell align="right" {...form.register("discount")}>{ccyFormat(0)}</TableCell>
//         </TableRow>

//         <TableRow>
//             <TableCell colSpan={2}>Total</TableCell>
//             <TableCell align="right" {...form.register("total")}>
//                 <Typography fontSize={25} fontWeight={500} >{ccyFormat(totalAmount)}
//                 </Typography></TableCell>
//         </TableRow>

//         </TableBody>
//         </Table>
//         </Box>



//     </Box>
//   );
// }
// export default InvoiceForm;