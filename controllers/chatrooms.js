import models from "../models"
import sortBy from "lodash.sortby";
import notFound from "./notFound"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const getChatroomById = async (id) => {
    const chatroomById = await models.chatrooms.findOne({
        where: {
            id
        }
    });

    return chatroomById
}

export const getChatrooms = async function (req, res) {
    const { params, query } = req

    let chatRooms = []

    try {
        if (query.groupId) {
            const chatroomById = await getChatroomById(query.groupId)
            chatRooms.push(chatroomById)
        } else if (query.groupName) {
            const chatroomByName = await models.chatrooms.findAll({
                where: {
                    name: query.groupName
                }
            });
            chatRooms.push(chatroomByName)
        } else {
            const allChats = await models.chatrooms.findAll({
                include: [
                    { model: models.messages, as: 'messages' },
                    { model: models.users, as: 'users' }
                ],
                order: [['createdAt', 'desc'], ['messages', 'updatedAt', 'asc']]
            });
            chatRooms = allChats
        }
    } catch (error) {
        console.log({ error })
    }

    return res.json({ chatRooms })
}

export const createChatroom = async (req, res) => {
    try {
        const newRoom = (await models.chatrooms.create(req.body)).toJSON()
        const chatroom_user = (await models.chatrooms_users.create({
            userId: req.body.userId,
            chatroomId: newRoom.id,
            isadmin: true
        })).toJSON();

        res.json({
            chatroom: newRoom,
            chatroom_user
        })
    } catch (error) {
        console.log({ error })
        res.status(400).send(error)
    }
}

export const joinChatroom = async (req, res) => {
    try {
        const chatroom_user = (await models.chatrooms_users.create({
            userId: req.body.userId,
            chatroomId: req.body.chatroomId,
        })).toJSON();

        res.json({
            chatroom_user
        })
    } catch (error) {
        console.log({ error })
        res.status(400).send(error)
    }
}

export const updateChatroom = async (req, res) => {
    const { chatRoomId } = req.query

    if (!chatRoomId) {
        return notFound(res)
    }

    try {
        const room = await getChatroomById(chatRoomId)
        room.update(req.body)
        const updateRoom = await room.save()
        res.json(updateRoom.toJSON())
    } catch (error) {
        console.log({ error })
        notFound(res)
    }
}

export const deleteChatroom = async (req, res) => {
    const { chatRoomId } = req.query

    try {
        const room = await getChatroomById(chatRoomId)
        await room.destroy()
        res.status(200).send('deleted')
    } catch (error) {
        console.log({ error })
        notFound(res)
    }
}

export default getChatrooms
