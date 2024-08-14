// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Box, InputBase, IconButton, List, ListItem, Stack, Avatar, Typography, Tooltip } from '@mui/material';
// import { Search as SearchIcon, PersonAdd as PersonAddIcon, ArrowBack, ArrowCircleLeft, ArrowCircleRight } from '@mui/icons-material';
// import { sampleUser } from '../../constants/sampleData'; // Adjust the import path as needed
// import { useDispatch, useSelector } from 'react-redux';
// import { setIsSearch } from '../../redux/missSclice';
// import { getSearchUsers } from '../../redux/usersSlice';

// const SearchComponent = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const [searchQuery, setSearchQuery] = useState(new URLSearchParams(location.search).get('query') || '');

//     const {users}=useSelector((state) =>state.users);
//     console.log("user",users)

//     const handleSearchSubmit = (event) => {
//         event.preventDefault();
//         navigate(`/search?query=${searchQuery}`);
//     };
//     const searchCloseHandle=() => {
//         dispatch(setIsSearch(false))
//     }

//     useEffect(()=>{
//         const timeOut = setTimeout(()=>{
//             dispatch(getSearchUsers(searchQuery))
//         })

//         return () => clearTimeout(timeOut)
//     },[searchQuery])

//     const filteredUsers = sampleUser.filter(user => 
//         user.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     const handleFriendRequest = (userId) => {
//         console.log(`Friend request sent to user with ID: ${userId}`);
//         // Add your friend request handling logic here
//     };
    

//     return (
//         <Box sx={{ height: '90vh', display: 'flex', flexDirection: 'column' }}>
//             <Box component="form" onSubmit={handleSearchSubmit} >
//                 <InputBase
//                     placeholder="Search…"
//                     inputProps={{ 'aria-label': 'search' }}
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     sx={{
//                         color: 'black',
//                         bgcolor: '#e6e3e3',
//                         borderRadius: 1,
//                         paddingLeft: 2,
//                         paddingRight: 2,
//                         marginRight: 1,
//                         height: '2rem',
//                         width:'82%',
//                         flexGrow: 1,

//                     }}
//                 />
//                 <IconButton onClick={searchCloseHandle} color="primary" aria-label="search">
//                     <ArrowCircleRight />
//                 </IconButton>
                
//             </Box>
//             <Box sx={{ flexGrow: 1,overflowY: 'auto', '&::-webkit-scrollbar': { display: 'none' }, msOverflowStyle: 'none', scrollbarWidth: 'none', mb: '1rem' }}>
//                 <List>
//                     {filteredUsers.length > 0 ? (
//                         filteredUsers.map(user => (
//                             <SearchResultItem 
//                                 key={user._id}
//                                 user={user}
//                                 onFriendRequest={handleFriendRequest}
//                             />
//                         ))
//                     ) : (
//                         <Typography variant="body1" sx={{ padding: 2 }}>No results found</Typography>
//                     )}
//                 </List>
//             </Box>
//         </Box>
//     );
// };

// const SearchResultItem = ({ user, onFriendRequest }) => {
//     const { name, avatar, _id } = user;
//     return (
//         <ListItem>
//             <Stack direction="row" alignItems="center" spacing="1rem" width="100%">
//                 <Avatar src={avatar} />
//                 <Tooltip title={name} arrow>
//                     <Typography
//                         variant="body1"
//                         sx={{
//                             flex: 1,
//                             display: "-webkit-box",
//                             WebkitLineClamp: 1,
//                             WebkitBoxOrient: "vertical",
//                             overflow: "hidden",
//                             textOverflow: "ellipsis",
//                             width: "100%",
//                             cursor: "pointer"
//                         }}
//                     >
//                         {name}
//                     </Typography>
//                 </Tooltip>
//                 <IconButton color="primary" onClick={() => onFriendRequest(_id)}>
//                     <PersonAddIcon />
//                 </IconButton>
//             </Stack>
//         </ListItem>
//     );
// };

// export default SearchComponent;



import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, InputBase, IconButton, List, ListItem, Stack, Avatar, Typography, Tooltip } from '@mui/material';
import { PersonAdd as PersonAddIcon, ArrowCircleRight } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setIsSearch } from '../../redux/missSclice';
import { getSearchUsers, sendFriendRequest } from '../../redux/usersSlice';


const SearchComponent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState(new URLSearchParams(location.search).get('query') || '');
    const { users } = useSelector((state) => state.users);
    console.log(users);

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        navigate(`/search?query=${searchQuery}`);
    };

    const searchCloseHandle = () => {
        dispatch(setIsSearch(false));
    };

    useEffect(() => {
        const timeOut = setTimeout(() => {
            if (searchQuery.trim()) {
                dispatch(getSearchUsers(searchQuery));
            }
        }, 500); // Adjust timeout delay as needed

        return () => clearTimeout(timeOut);
    }, [searchQuery, dispatch]);

    

    async function handleFriendRequest  (id)  {
        await dispatch(sendFriendRequest({userId:id}));
        console.log(id);
    };

    return (
        <Box sx={{ height: '90vh', display: 'flex', flexDirection: 'column' }}>
            <Box component="form" onSubmit={handleSearchSubmit}>
                <InputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{
                        color: 'black',
                        bgcolor: '#e6e3e3',
                        borderRadius: 1,
                        paddingLeft: 2,
                        paddingRight: 2,
                        marginRight: 1,
                        height: '2rem',
                        width: '82%',
                        flexGrow: 1,
                    }}
                />
                <IconButton onClick={searchCloseHandle} color="primary" aria-label="search">
                    <ArrowCircleRight />
                </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1, overflowY: 'auto', '&::-webkit-scrollbar': { display: 'none' }, msOverflowStyle: 'none', scrollbarWidth: 'none', mb: '1rem' }}>
                <List>
                    {users && users.length > 0 ? (
                        users.map(user => (
                            <SearchResultItem 
                                key={user._id}
                                user={user}
                                onFriendRequest={handleFriendRequest}
                            />
                        ))
                    ) : (
                        <Typography variant="body1" sx={{ padding: 2 }}>No results found</Typography>
                    )}
                </List>
            </Box>
        </Box>
    );
};

const SearchResultItem = ({ user, onFriendRequest }) => {
    const { name, avatar, _id } = user;
    return (
        <ListItem>
            <Stack direction="row" alignItems="center" spacing="1rem" width="100%">
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
                <IconButton color="primary" onClick={() => onFriendRequest(_id)}>
                    <PersonAddIcon />
                </IconButton>
            </Stack>
        </ListItem>
    );
};

export default SearchComponent;
