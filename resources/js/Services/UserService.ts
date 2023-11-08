import axios from "axios";

const BASE_URL = "/api/users";

export const UserService = new (class UserService {
    private BASE_URL = "/api/users";

    public async createUser() {
        try {
            const request = await axios.post(BASE_URL, {});
        } catch (e: any) {
            console.log("test");
            console.log(e);
        }
    }
})();
