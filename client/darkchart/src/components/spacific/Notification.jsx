import { ArrowBack as ArrowBackIcon, Cancel as CancelIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { Avatar, Box, IconButton, ListItem, Stack, Tooltip, Typography } from '@mui/material';
import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { acceptRequest } from '../../redux/usersSlice';
import { setIsNotifications } from '../../redux/missSclice';

const Notification = ({ onBackClick ,notification}) => {
const dispatch=useDispatch();

    async function handler ({ _id, accept })  {
       const res = await dispatch(acceptRequest({requestId:_id,accept}));

       if(res?.success){
        await dispatch(setIsNotifications(false));
        await dispatch(setIsNotifications(true));
       }
    };

    

    
    return (
        <div>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={onBackClick}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6">Notifications</Typography>
            </Box>

            <Box sx={{ maxHeight: '450px', overflowY: 'scroll', '&::-webkit-scrollbar': { display: 'none' }, msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                {notification.length > 0 ? (
                    notification.map(({ sender, _id }) => (
                        <NotificationItem 
                            sender={sender}
                            _id={_id}
                            handler={handler}
                            key={_id}
                        />
                    ))
                ) : (
                    <Typography variant="h6">No Notifications</Typography>
                )}
            </Box>
        </div>
    );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
    const { name, avatar } = sender;
    return (
        <ListItem>
            <Stack
                direction={"row"}
                alignItems={"center"}
                spacing={"1rem"}
                width={"100%"}
            >
                <Avatar src={avatar} />
                <Tooltip title={name} arrow>
                    <Typography
                        variant="body1"
                        sx={{
                            flex: 1,
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            width: "100%",
                            cursor: "pointer"
                        }}
                    >
                        {name}
                    </Typography>
                </Tooltip>

                <Stack direction={{ xs: "column", sm: "row" }}>
                    <IconButton onClick={() => handler({ _id, accept: true })}>
                        <CheckCircleIcon color="primary" />
                    </IconButton>
                    <IconButton color="error" onClick={() => handler({ _id, accept: false })}>
                        <CancelIcon />
                    </IconButton>
                </Stack>
            </Stack>
        </ListItem>
    );
});

export default Notification;
