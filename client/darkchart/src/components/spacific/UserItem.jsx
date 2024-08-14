import React from 'react';
import { Avatar, IconButton, ListItem, Stack, Tooltip, Typography } from '@mui/material';

import { Add, Remove } from '@mui/icons-material';

const UserItem = ({ user, onSelectMember,handlerIsLoading,isAdded=false,styling={} }) => {
    const { name, avatar, _id } = user;

    const handleSelectMember = () => {
        onSelectMember(_id); // Callback to handle member selection
    };

    return (
        <ListItem>
            <Stack direction="row" alignItems="center" spacing={2}  width="100%" {...styling}>
                <Avatar src={avatar[0]} />
                <Tooltip title={name} arrow>
                    <Typography
                        variant="body1"
                        sx={{
                            flex: 1,
                            display: '-webkit-box',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            cursor: 'pointer'
                        }}
                    >
                        {name}
                    </Typography>
                </Tooltip>
                <IconButton 
                 sx={{
                color:isAdded ? "error.main":"primary.main",}}
                onClick={handleSelectMember} disabled={handlerIsLoading}>
                    {isAdded? <Remove/> : <Add />}
                </IconButton>
            </Stack>
        </ListItem>
    );
};

export default UserItem;
