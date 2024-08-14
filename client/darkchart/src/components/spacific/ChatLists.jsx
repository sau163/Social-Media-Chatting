

import React from 'react';
import { Stack } from '@mui/material';
import ChatItem from './ChatItem';

const ChatLists = ({
    chats = [],
    chatId,
    onlineUsers = [],
    newMessagesAlert = [],
    handleDeleteChat // Assuming this should be passed as a prop
}) => {
    return (
        <div 
        style={{backgroundColor: '#f0f0f0', padding: '1rem', height: 'calc(110vh - 120px)', overflowY: 'scroll', msOverflowStyle: 'none', scrollbarWidth: 'none' }} 
        sx={{ '&::-webkit-scrollbar': { display: 'none' } }}
        >
            <Stack direction="column" spacing={1}>
                {chats.map((data, index) => {
                    const { avatar, _id, name, groupChat, members } = data;
                    const newMessagesAlertItem = newMessagesAlert.find(({ chatId }) => chatId === _id);
                    
                    // Check if members array is defined and not empty
                    const isOnline = Array.isArray(members) && members.length > 0 && onlineUsers.some((member) => members.includes(member));

                    return (
                        <ChatItem
                            key={_id}
                            avatar={avatar}
                            _id={_id}
                            name={name}
                            groupChat={groupChat}
                            sameSender={chatId === _id}
                            newMessagesAlert={newMessagesAlertItem}
                            isOnline={isOnline}
                            handleDeleteChat={handleDeleteChat}
                            
                        />
                    );
                })}
            </Stack>
        </div>
    );
};

export default ChatLists;
