import { ChatManager, TokenProvider } from '@pusher/chatkit-client'
import moment from 'moment'
import store  from  './store/index'

const INSTANCE_LOCATOR = process.env.VUE_APP_INSTANCE_LOCATOR;
const TOKEN_URL = process.env.VUE_APP_TOKEN_URL;
const MESSAGE_LIMIT = Number(process.env.VUE_APP_MESSAGE_LIMIT) || 10;

let currentUser = null;
let activeRoom = null;

function setMembers() {
    const members = activeRoom.users.map(user => ({
        username: user.id,
        name: user.name,
        presence: user.presence.state
    }));
    store.commit('setUsers', members)
}

async function subscribeToRoom(roomId) {
    store.commit('clearChatRoom');
    activeRoom = await currentUser.subscribeToRoomMultipart({
        roomId,
        messageLimit: MESSAGE_LIMIT,
        hooks: {
            onMessage: message => {
                    store.commit('addMessage', {
                    name: message.sender.name,
                    username: message.senderId,
                    text: message.parts[0].payload.content,
                    date: moment(message.createdAt).format('h:mm:ss a D-MM-YYYY')
                })
            },
            onPresenceChanged: () => {
                setMembers();
            },
            onUserStartedTyping: user => {
                store.commit('setUserTyping', user.id)
            },
            onUserStoppedTyping: () => {
                store.commit('setUserTyping', null)
            }
        }
    });
    setMembers();
    return activeRoom

}

async function sendMessage(text) {
    const messageId = await currentUser.sendSimpleMessage({
        text,
        roomId: activeRoom.id
    })
    return messageId
}




async function connectUser(userId) {
    const chatManager = new ChatManager({
        instanceLocator: INSTANCE_LOCATOR,
        tokenProvider: new TokenProvider({ url: TOKEN_URL }),
        userId
    });
    currentUser = await chatManager.connect();
    return currentUser;
}

function disconnectUser() {
    currentUser.disconnect()
}


export function isTyping(roomId) {
    currentUser.isTypingIn({roomId})
}




export default {
    connectUser,
    subscribeToRoom,
    sendMessage,
    disconnectUser
}