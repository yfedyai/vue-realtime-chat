import chatkit from '../chatkit';

// Helper function for displaying error messages
function handleError(commit, error) {
    const message = error.message || error.info.error_description;
    commit('setError', message);
}

export default {
    login: async function ({commit}, userId) {
        try {
            commit('setError', '');
            commit('setLoading', true);
            // Connect user to ChatKit service
            const currentUser = await chatkit.connectUser(userId);
            commit('setUser', {
                username: currentUser.id,
                name: currentUser.name
            });

            //Save list of users room in store
            const rooms = currentUser.rooms.map(({id, name}) => ({id, name}))
            console.log(rooms);
            commit('setRooms', rooms);

            //Subscribe user to a room
            const {id, name} = this.state.activeRoom || rooms[0];
            commit('setActiveRoom', {id, name});
            await chatkit.subscribeToRoom(id)

            commit('setReconnect', false);
            return true
        } catch (error) {
            handleError(commit, error)
        } finally {
            commit('setLoading', false);
        }
    }
}