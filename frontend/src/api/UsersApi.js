import api from "../config/axios";


export const fetchUser = async (userId) => {
    const response = await api.get(`/users/me`, {

    });
}