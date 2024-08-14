import { Box, Button, Dialog, DialogTitle, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'

import { sampleUser } from '../../constants/sampleData'
import UserItem from '../spacific/UserItem';

const AddMemderDilog = ({addMember,isLoadingAddMember,chatId}) => {
 
    const [members, setMembers] = useState(sampleUser);
    const [selectedMembers, setSelectedMembers] = useState([]);

    const selectMemberHandler = (userId) => {
        setSelectedMembers(prev => 
            prev.includes(userId) ? prev.filter((i) => i !== userId) : [...prev, userId]
        );
    };

    const addMemberSubmit = () => {
        addMember(chatId)
    };
    const closeHandler = () => {
        setSelectedMembers([]);
        setMembers([]);
    };
 
    return (
    <Box
    sx={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(0,0,0,0.1)',
      borderRadius: '5px',
      p: '1rem',
      zIndex: 1000,
    }}
  >
    <Dialog open >
      <Stack>
        <DialogTitle>Add Members</DialogTitle>

        <Stack sx={{
              maxHeight: '300px', 
              overflowY: 'scroll',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
            }}>
          { members.length>0 ?
            members.map(i=>(
              <UserItem key={i._id} user={i} onSelectMember={selectMemberHandler} isAdded={selectedMembers.includes(i._id)}/>
            )):<Typography textAlign={"center"}>No Friends</Typography>
          }
        </Stack>
        <Stack onClick={closeHandler} direction={"row"} alignItems={"center"} justifyContent={"space-evenly"}>
        <Button onClick={addMemberSubmit} variant='contained' disabled={isLoadingAddMember} >submit</Button>
        <Button color='error'>cancel</Button>
        </Stack>
        
      </Stack>
    </Dialog>
  </Box>
)
  
}

export default AddMemderDilog;
