const users = [];

/**
 * ==== addUser ====
 * @param {String} id - socket id representing a user instance
 * @param {String} displayName
 * @param {String} roomName
 */
const addUser = ({ id, displayName, roomName }) => {
    displayName = displayName.trim().toLowerCase();
    roomName = roomName.trim().toLowerCase();

    // Check to see if a username exists in the room they are trying to join
    const existingUser = users.find(user => user.displayName === displayName && user.roomName === roomName);

    if(existingUser){
        return {
            error: 'Username is taken in the room you are trying to join'
        }
    }

    // Create new user and add to users array
    const user = { id, displayName, roomName };

    users.push(user);
}

/**
 * ==== removeUser ====
 * @param {String} id - socket id representing a user instance
 */
const removeUser = (id) => {
    const index = users.findIndex(user => user.id === id);

    // If the user exists, remove it from users and return the removed user
    if(index !== -1){
        return users.splice(index, 1)[0];
    }
}

const getUser = () => {

}

const getUsersInRoom = () => {

}