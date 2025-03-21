import axios from "axios"

export const UsersService = () => {
    const BASE_URL = 'https://jsonplaceholder.typicode.com/users'

    const getUsers = async () => {
        const {data} = await axios.get(BASE_URL)
        return data;     
    }

    const getUserById = () => {

    }

    return {
        getUsers,
        getUserById
    }
}