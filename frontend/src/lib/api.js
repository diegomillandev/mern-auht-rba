import API from "../config/axios";

export const getProfile = async () => {
    try {
        const response = await API.get("/users/me");
        return response.data;
    } catch (error) {
        throw error || new Error("An unknown error occurred while fetching the profile.");
    }
};

export const updateProfile = async (profileData) => {
    try {
        const response = await API.put("/users/me", profileData);
        return response.data;
    } catch (error) {
        throw error || new Error("An unknown error occurred while updating the profile.");
    }
}

export const changePassword = async (passwordData) => {
    try {
        const response = await API.patch("/users/me", passwordData);
        return response.data;
    } catch (error) {
        throw error || new Error("An unknown error occurred while changing the password.");
    }
}