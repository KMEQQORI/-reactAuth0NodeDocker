import auth0Client from "Auth";
import axios from "axios";

const messageApi = {
  addNewMessage: async (message, projectId) => {
    return await axios.post(process.env.REACT_APP_API_BASE_URL + "/message/", {
      idUser: auth0Client.isAuthenticated()
        ? JSON.stringify(auth0Client.getProfile())
        : null,
      contenu: message,
      idProject: projectId,
      headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` }
    });
  }
};

export default messageApi;
