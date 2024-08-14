

// import { AlternateEmail, Face } from '@mui/icons-material';
// import { Avatar, Stack, Typography } from '@mui/material';
// import React from 'react';

// const Profile = ({user}) => {
//   return (
//     <Stack
//       spacing={"2rem"}
//       direction={"column"}
//       alignItems={"center"}
      
//     >
//       <Avatar
       
//       //  src={user.avatar.url}
//       //  alt={`Avatar ${index}`}
//         sx={{
//           width: 150,
//           height: 150,
//           objectFit: "contain",
//           marginBottom: "1rem",
//           border: "5px solid white"
//         }}
//       />
//       <ProfileComponent heading={"bio"} text={"trdjcgjfvc"} />
//       <ProfileComponent heading={"userName"} text={user.userName} Icon={<AlternateEmail/>}/>
//       <ProfileComponent heading={"Name"} text={user.name} Icon={<Face/>}/>
//     </Stack>
//   )
// }

// const ProfileComponent = ({ text, Icon, heading }) => {
//   return (
//     <Stack
//       direction={"row"}
//       spacing={"1rem"}
//       alignItems={"center"}
//       textAlign={"center"}
//     >
//       {Icon && Icon}

//       <Stack>
//         <Typography variant='body1'>
//           {text}
//         </Typography>
//         <Typography color={"gray"} variant='caption'>
//           {heading}
//         </Typography>
//       </Stack>
//     </Stack>
//   )
// }

// export default Profile;


import { AlternateEmail, Face } from '@mui/icons-material';
import { Avatar, Stack, Typography } from '@mui/material';
import React from 'react';


import { transformImage } from '../../lib/features';

const Profile = ({user}) => {
 
  
  return (
    <Stack
      spacing={"2rem"}
      direction={"column"}
      alignItems={"center"}
    >
      <Avatar
         src={transformImage(user.avatar) } // Assuming user.avatar.url contains the avatar URL
         alt={user.name}
        sx={{
          width: 150,
          height: 150,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white"
        }}
      />
      {/* <img src={transformImage(user.avatar) } alt={user.name} sx={{
          width: 150,
          height: 150,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white"
        }}
      /> */}
      <ProfileComponent heading={"Bio"} text={"trdjcgjfvc"} />
      <ProfileComponent heading={"Username"} text={user.userName} Icon={<AlternateEmail />} />
      <ProfileComponent heading={"Name"} text={user.name} Icon={<Face />} />
    </Stack>
  )
}

const ProfileComponent = ({ text, Icon, heading }) => {
  return (
    <Stack
      direction={"row"}
      spacing={"1rem"}
      alignItems={"center"}
      textAlign={"center"}
    >
      {Icon && Icon}

      <Stack>
        <Typography variant='body1'>
          {text}
        </Typography>
        <Typography color={"gray"} variant='caption'>
          {heading}
        </Typography>
      </Stack>
    </Stack>
  )
}

export default Profile;
