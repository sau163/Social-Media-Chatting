



import { Box, Button, Dialog, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import React, { memo, useEffect, useState } from 'react';
import { Add, ArrowBack, Delete, Done, Edit, Menu } from '@mui/icons-material';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import AvatarCard from '../components/shared/AvatarCard';
import { sampleChat, sampleUser } from '../constants/sampleData';
import AddMemderDilog from '../components/shared/AddMemderDilog';
import UserItem from '../components/spacific/UserItem';

const isAddMember = false;

const Group = () => {
  const chatId = useSearchParams()[0].get("group");
  const navigate = useNavigate();
  console.log(chatId);

  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("saurabh");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState();
  const [isDelete, setIsDelete] = useState(false);

  const navigateBack = () => {
    navigate('/');
  };

  const handleMobile = () => {
    setIsMobileMenu(prev => !prev);
  };

  const handleMobileClose = () => {
    setIsMobileMenu(false);
  };

  const updateGroupNameHandler = () => {
    setIsEdit(false);
    console.log('updateGroupNameHandler');
  };

  const openConfirmDeleteHandler = () => {
    setIsDelete(true);
    console.log('confirmDeleteHandler');
  };

  const closeConfirmDeleteHandler = () => {
    setIsDelete(false);
    console.log('closeConfirmDeleteHandler');
  };

  const deleteHandler = () => {
    setIsDelete(false);
    console.log('deleteHandler');
  };

  const openAddMembers = () => {
    console.log('openAddMembers');
  };

  const removeMemberHandler = () => {
    console.log('removeMemberHandler');
  };

  useEffect(() => {
    if(chatId){
      setGroupName(`groupName ${chatId}`);
    setGroupNameUpdatedValue(`group name ${chatId}`);

    }
    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit(false);
    };
  }, [chatId]);

  const IconBtns = (
    <>
      <Box sx={{
        display: {
          xs: 'block',
          sm: 'none',
        },
        position: 'fixed',
        right: '1rem',
        top: '1rem',
      }}>
        <IconButton onClick={handleMobile}>
          <Menu />
        </IconButton>
      </Box>

      <Tooltip title="back">
        <IconButton
          onClick={navigateBack}
          sx={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            bgcolor: 'rgba(0,0,0,0.5)',
            color: 'white',
            ':hover': {
              bgcolor: 'rgba(0,0,0,0.7)',
            },
          }}
        >
          <ArrowBack />
        </IconButton>
      </Tooltip>
    </>
  );

  const GroupName = (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={"1rem"}
    >
      {isEdit ? (
        <>
          <TextField value={groupNameUpdatedValue} onChange={(e) => setGroupNameUpdatedValue(e.target.value)} />
          <IconButton onClick={updateGroupNameHandler}><Done /></IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4">{groupName}</Typography>
          <IconButton onClick={() => setIsEdit(true)}><Edit /></IconButton>
        </>
      )}
    </Stack>
  );

  const buttonGroup = (
    <Stack
      direction={{
        sm: "row",
        xs: "column-reverse",
      }}
      spacing={"1rem"}
      p={{
        xs: "0",
        sm: "1rem",
        md: "2rem rem"
      }}
    >
      <Button size="large" color='error' startIcon={<Delete />} onClick={openConfirmDeleteHandler}>Delete Group</Button>
      <Button size='large' variant='contained' startIcon={<Add />} onClick={openAddMembers}>Add Members</Button>
    </Stack>
  );

  return (
    <Grid container height="100vh">

      <Grid
        item
        sx={{
          display: {
            xs: 'none',
            sm: 'block',
          },
        }}
        sm={3}
        bgcolor="#86bcdb"
      >
        <Typography variant="h5" sx={{ padding: '1rem', textAlign: 'center' }}>Manage Group</Typography>
        <GroupList myGroup={sampleChat} chatId={chatId} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          padding: '1rem 3rem',
        }}
      >
        {IconBtns}
        {groupName && <>
          {GroupName}
          <Typography
            margin={"2rem 10rem 0rem 10rem"}
            alignSelf={"flex-start"}
            variant='body1'
            fontSize={25}>Members</Typography>

          <Stack
            maxWidth={"45rem"}
            width={"80%"}
            boxSizing={"border-box"}
            padding={{
              sm: "1rem",
              xs: "0",
              md: "1rem 4rem",
            }}
            // spacing={"2rem"}
            bgcolor={"#white"}
            height={"65vh"}
            sx={{overflowY: 'scroll', '&::-webkit-scrollbar': { display: 'none' }, msOverflowStyle: 'none', scrollbarWidth: 'none'}}>
            {/* members */}

            {
              sampleUser.map((i)=>(
                <UserItem user={i} key={i._id} isAdded styling={{
                  padding: '0.5rem 1rem 0.5rem 1rem',
                  borderRadius: '1rem',
                  boxShadow: '0 0 0.5rem rgba(0, 0, 0, 0.2)',
                }}
                  onSelectMember={removeMemberHandler}
                />
              ))
            }

          </Stack>

          {buttonGroup}

        </>}

      </Grid>
      {isAddMember && <AddMemderDilog chatId={chatId} />
      }
      {
        isDelete && (

          <Dialog open>
          <Box
            sx={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              borderRadius: '5px',
              p: '1rem',
              zIndex: 1000,
            }}
          >
            <Stack alignItems={"center"} direction={"column"} spacing={"1rem"}>
              <Typography sx={{ fontSize: 20 }}>Confirm Delete</Typography>
              <Typography>Are you sure you want to delete this group?</Typography>
              <Stack direction={"row"} spacing={"1rem"}>
                <Button variant="contained" color="error" onClick={closeConfirmDeleteHandler}>No</Button>
                <Button variant="contained" color="primary" onClick={deleteHandler}>Yes</Button>
              </Stack>
            </Stack>
          </Box>
          </Dialog>
          
        )
      }

      <Drawer sx={{
        display: {
          xs: 'block',
          sm: 'none',
        }
      }} open={isMobileMenu} onClose={handleMobileClose}>
        <Typography variant="h5" sx={{ padding: '1rem', textAlign: 'center'}}>Manage Group</Typography>
        <GroupList w={"100%"} myGroup={sampleChat} chatId={chatId} />
      </Drawer>

    </Grid>
  );
};

const GroupList = ({ w = "100%", myGroup = [], chatId }) => (
  <Stack width={w} direction={"column"} sx={{ backgroundColor: '#f0f0f0', padding: '1rem', overflowY: 'scroll', '&::-webkit-scrollbar': { display: 'none' }, msOverflowStyle: 'none', scrollbarWidth: 'none', height: 'calc(109vh - 120px)' }}>
    {myGroup.length > 0 ? myGroup.map((group) => <GroupListItem group={group} chatId={chatId} key={group._id} />) : <Typography textAlign={"center"} padding={"1rem"} >No Groups</Typography>}
  </Stack>
);

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    <Link to={`?group=${_id}`} onClick={(e) => {
      if (chatId === _id) e.preventDefault();
    }} style={{ textDecoration: 'none' }}>
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"} sx={{ backgroundColor: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', marginBottom: '0.5rem', '&:hover': { backgroundColor: '#f5f5f5' } }}>
        <AvatarCard avatar={avatar} />
        <Typography variant="subtitle1" color="textPrimary">{name}</Typography>
      </Stack>
    </Link>
  );
});

export default Group;


