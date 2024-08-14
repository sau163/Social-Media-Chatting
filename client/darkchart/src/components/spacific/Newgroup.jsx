import React, { useState } from 'react';
import { Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { sampleUser } from '../../constants/sampleData';
import UserItem from './UserItem';
import { useInputValidation } from '6pp';

const NewGroup = ({ onBackClick }) => {
    const groupName = useInputValidation("");
    const [members, setMembers] = useState(sampleUser);
    const [selectedMembers, setSelectedMembers] = useState([]);

    const selectMemberHandler = (userId) => {
        setSelectedMembers(prev => 
            prev.includes(userId) ? prev.filter((i) => i !== userId) : [...prev, userId]
        );
    };
    
    const submitHandler = () => {
        console.log("Group created:", groupName.value);
        // Add your group creation logic here
    };

    return (
        <Box sx={{ height: '84vh', display: 'flex', flexDirection: 'column'}}>
            <Box sx={{ display: 'flex', alignItems: 'right'}}>
                <IconButton onClick={onBackClick}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6">Create New Group</Typography>
            </Box>

            <Box sx={{ mb: '1rem' }}>
                <TextField 
                    label="Group Name"
                    value={groupName.value}
                    onChange={groupName.changeHandler}
                    fullWidth
                    InputProps={{ sx: { height: 40 } }}  // Adjust the height of the TextField
                />
            </Box>

            <Typography variant="body1" sx={{ mb: '0.5rem' }}>Members</Typography>
            <Box sx={{ flexGrow: 1, overflowY: 'auto', '&::-webkit-scrollbar': { display: 'none' }, msOverflowStyle: 'none', scrollbarWidth: 'none', mb: '1rem' }}>
                <Stack spacing={0}>
                    {members.map((user) => (
                        <UserItem key={user._id} user={user} onSelectMember={selectMemberHandler} isAdded={selectedMembers.includes(user._id)} />
                    ))}
                </Stack>
            </Box>

            <Box sx={{ borderTop: '1px solid #ccc', pt: '1rem' }}>
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" color="primary" onClick={submitHandler}>
                        Create
                    </Button>
                    <Button variant="contained" color="error">
                        Cancel
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
};

export default NewGroup;
