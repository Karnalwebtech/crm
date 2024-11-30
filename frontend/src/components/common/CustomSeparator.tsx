// 'use client';

// import { Breadcrumbs, Stack, Typography } from '@mui/material';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import React from 'react';

// const CustomSeparator: React.FC = () => {
//     const pathname = usePathname();
//     const pathArray = pathname.split('/').filter((x) => x);
//     const breadcrumbs = pathArray.map((segment, index) => {
//         const href = `/${pathArray.slice(0, index + 1).join('/')}`;
        
//         return index !== pathArray.length - 1 ? (
//             <Link key={index} href={href}>
//                 {segment.charAt(0).toUpperCase() + segment.slice(1)}
//             </Link>
//         ) : (
//             <Typography key={index} sx={{ color: 'text.primary' }}>
//                 {segment.charAt(0).toUpperCase() + segment.slice(1)}
//             </Typography>
//         );
//     });

//     return (
//         <Stack>
//             <Breadcrumbs aria-label="breadcrumb">
//                 <Link key="home" href="/dashboard">
//                     Home
//                 </Link>
//                 {breadcrumbs}
//             </Breadcrumbs>
//         </Stack>
//     );
// };

// export default CustomSeparator;
