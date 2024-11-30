// "use client"
// import React, { useState } from 'react'
// import Purchase_form from './Purchase_form'
// import Drag_input_field from '@/components/image_compress/Drag_input_field'
// import Image_card from '@/components/image_compress/Image_card'
// import { additional_props, Notes_terms, purchase_product_list_props, purchase_type_props } from '@/types/Purchase_type'
// import Accordion_tab from '@/components/common/accordion/Accordion_tab'
// import Textarea_normal from '@/components/common/fields/Textarea_normal'
// import Total_cal from '../../common/total/Total_cal'

// const Purchase = () => {
//     const [files, setFiles] = useState<File[]>([]);
//     const [notes_terms, setNotesTerms] = useState<Notes_terms[]>([
//     ]);
//     const [itemData, setItemData] = useState<{ img: string; name: string }[]>([]);
//     const [product_list, set_product_list] = useState<any>([]);
//     const [additional_number_data, set_additional_data] = useState<additional_props[]>([])
//     const accordion = [{ key: "Notes", label: "Notes" }, { key: "Terms", label: "Terms & Conditions" }]


//     const handleDrop = (acceptedFiles: File[]) => {
//         const imageData = acceptedFiles.map((file) => ({
//             img: URL.createObjectURL(file),
//             name: file.name,
//         }));
//         setFiles(acceptedFiles);
//         setItemData(imageData);
//     };

//     const handleDelete = (index: number) => {
//         const newImages = files.filter((_, i) => i !== index);
//         const imageData = newImages.map((file) => ({
//             img: URL.createObjectURL(file),
//             name: file.name,
//         }));
//         setFiles(newImages);
//         setItemData(imageData);
//     };


//     const onSubmit = (data: purchase_type_props) => {

//         // console.log(data);
//     };

//     return (
//         <div>
//             <div>
//                 <p >
//                     Create a Product
//                 </p>
//             </div>
//             <div className="py-8">

//                 <div className="flex flex-col lg:flex-row">
//                     <div className=" w-full lg:w-9/12">
//                         <Purchase_form
//                             onSubmit={onSubmit}
//                             product_list={product_list}
//                             set_product_list={set_product_list}
//                             additional_number_data={additional_number_data}
//                             set_additional_data={set_additional_data}
//                         />
//                         <div className='flex gap-2'>
//                             <div className='w-1/2'>
//                                 <Accordion_tab data={accordion} value={notes_terms} set_value={setNotesTerms} />
//                             </div>
//                             <div className='w-1/2 text-end'>
//                                 <Total_cal product_list={product_list} additional_number_data={additional_number_data} />
//                             </div>
//                         </div>
//                     </div>
//                     <div className=" w-full p-4 lg:w-3/12 lg:p-2">
//                         <div>
//                             <Drag_input_field onDrop={handleDrop} />
//                         </div>
//                         <div>
//                             {/* <Image_card itemData={itemData} onDelete={handleDelete} /> */}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>


//     )
// }

// export default Purchase