// // import { AvatarGroup, Box } from '@mui/material'
// // import React from 'react'

// // const AvatarCard = ({avatar=[],max=4}) => {
// //   return<stack direction={"row"} spacing={0.5}>
// //     <AvatarGroup max={max}>
// //     <Box width={"5rem"} height={"3rem"}>
// //         {avatar.map((src,index) => (
// //             <img
// //                 alt={`Avatar ${index}`}
// //                 key={Math.rendom()*100}
// //                 src={i}
// //                 style={{ width: "3rem", height: "3rem" ,border:"absolute", left:{
// //                     xs:`${0.5+index}rem`,
// //                     sm:$`${index}rem`,
// //                 } }}
 
// //             />
// //         )

// //         )}
// //     </Box>
// //     </AvatarGroup>
// //   </stack>
// // }

// // export default AvatarCard

// import { Avatar, AvatarGroup, Box, Stack } from '@mui/material';
// import React from 'react';
// import { transformImage } from '../../lib/features';

// const AvatarCard = ({ avatar = [], max = 4 }) => {
//     return (
//         <Stack direction={"row"} spacing={0.5}>
//             <AvatarGroup max={max}>
//                 {avatar.map((src, index) => (
//                     <Box
//                         key={index} // Corrected key usage
//                         width={"5rem"}
//                         height={"3rem"}
//                         sx={{
//                             position: "relative",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             border: "1px solid #ddf3f5", // Lighter border
//                             borderRadius: "50%",
//                             overflow: "hidden",
//                             '&:not(:last-child)': {
//                                 marginRight: '-1rem', // Adjust spacing between avatars
//                             }
//                         }}
//                     >
//                     {avatar.map((i,index)=>{
//                         <Avatar
//                         key={Math.random()*100}
//                         src={transformImage(i)}
//                         alt={`Avatar ${index}`}>
//                         sx={{
//                             width:"3rem",
//                             height:"3rem",
//                             border:"absolute",
//                             left:{
//                                 xs:`${0.5+index}rem`,
//                                 sm:$`${index}rem`,
//                             },
//                         }}

//                         </Avatar>
//                     })}
//                         {/* <img
//                             alt={`Avatar ${index}`}
//                             src={src}
//                             style={{
//                                 width: "100%",
//                                 height: "auto",
//                                 objectFit: "cover",
//                             }}
//                         /> */}
//                     </Box>
//                 ))}
//             </AvatarGroup>
//         </Stack>
//     );
// }

// export default AvatarCard;

import { Avatar, AvatarGroup, Box, Stack } from '@mui/material';
import React from 'react';
import { transformImage } from '../../lib/features';

const AvatarCard = ({ avatar = [], max = 4 }) => {
    return (
        <Stack direction={"row"} spacing={0.5}>
            <AvatarGroup max={max}>
                {avatar.map((src, index) => (
                    <Box
                        key={index} // Corrected key usage
                        width={"5rem"}
                        height={"3rem"}
                        sx={{
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "1px solid #ddf3f5", // Lighter border
                            borderRadius: "50%",
                            overflow: "hidden",
                            '&:not(:last-child)': {
                                marginRight: '-1rem', // Adjust spacing between avatars
                            }
                        }}
                    >
                        <Avatar
                            key={Math.random() * 100}
                            src={transformImage(src)}
                            alt={`Avatar ${index}`}
                            // sx={{
                            //     width: "3rem",
                            //     height: "3rem",
                            //     position: "absolute",
                            //     left: {
                            //         xs: `${0.5 + index}rem`,
                            //         sm: `${index}rem`,
                            //     },}}
                            style={{
                                width: "100%",
                                height: "auto",
                                objectFit: "cover",
                           }}

                           
                        />
                    </Box>
                ))}
            </AvatarGroup>
        </Stack>
    );
};

export default AvatarCard;
