import { Col, Container, Row, Stack, SearchB } from 'react-bootstrap'
import { useEffect, useState } from 'react'

import { TextField } from '@mui/material';
import Settings from '@mui/icons-material/Settings';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import PlusOneRounded from '@mui/icons-material/PlusOneRounded';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import { GroupList } from '../components/GroupItem/GroupItem.component'
import styles from "../styles/chatrooms.module.css"
import AddNewGroupForm from '../components/AddNewGroupForm/AddNewGroupForm';

const ModalBoxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

let listItems = []
for (let i = 0; i < 10000; i++) {
    listItems.push({ id: i, content: i })
}

export default function Chatrooms() {


    const [newMessage, setNewMessage] = useState('')
    const [allMessages, setAllMessages] = useState([])

    const [groups, setGroups] = useState([])

    const [isModalOpen, setIsModalOpen] = useState(false);

    const getChatrooms = () => {
        fetch('/api/chatrooms')
            .then(response => response.json())
            .then(data => setGroups(data.chatRooms))
            .catch(console.error)
    }

    useEffect(() => {
        getChatrooms()
    }, [])

    return (
        <Container fluid className={styles.chatroomsContainer}>
            <Row className='full-height'>
                <Col style={{ border: '1px solid black' }} xs={3}>
                    <div style={{ flex: 'row' }}>
                        {/* <Icon n÷ame */}
                        <Settings />
                        <PlusOneRounded />
                        <a onClick={() => setIsModalOpen(true)}>
                            <Fab color="primary" aria-label="add">
                                <AddIcon />
                            </Fab>
                        </a>
                        <Modal
                            open={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={ModalBoxStyle}>
                                <AddNewGroupForm onSubmit={() => {
                                    setIsModalOpen(false)
                                    getChatrooms();
                                }} />
                            </Box>
                        </Modal>
                    </div>
                    <div>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            fullWidth
                            label="Search"
                            style={{
                                marginTop: 20
                            }}
                        />
                    </div>
                    <GroupList groups={groups} />
                </Col>
                <Col style={{ border: '1px solid black' }} xs={9}>
                    <div style={{ marginRight: 0 }}>
                        <Settings />
                    </div>
                    <Stack gap={3} style={{ margin: 20 }}>

                        {allMessages.map((message) => {
                            if (message.sender == 'Rama') {
                                return (
                                    <div style={{ textAlign: 'right' }}>
                                        {message.message}
                                    </div>
                                )
                            }
                            else {
                                return (
                                    <div >
                                        {message.message}
                                    </div>
                                )
                            }
                        })}
                    </Stack>


                    <TextField

                        id="outlined-basic"
                        variant="outlined"
                        value={newMessage}
                        onChange={(event) => setNewMessage(event.target.value)}
                        onKeyDown={(event) => {
                            if (newMessage.length > 0 && event.keyCode == 13) {
                                setAllMessages([...allMessages, { 'sender': 'Rama', 'message': newMessage }])
                                setNewMessage('')
                                // alert(newMessage)
                            }
                        }}
                        label="Message"
                        style={{
                            marginTop: 20,
                            position: 'absolute', bottom: 20,
                            width: '72.5%'
                        }}

                    />

                </Col>
            </Row>
        </Container>
    )
}
