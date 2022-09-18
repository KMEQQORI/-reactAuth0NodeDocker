import auth0Client from "Auth";
import axios from "axios";

const contributionApi = {
  addNewContribution: async (idUser, type, amount) => {
    return await axios.post(
      process.env.REACT_APP_API_BASE_URL + "/contribution/",
      {
        idUser,
        type,
        amount
      },
      { headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` } }
    );
  },
  EditContribution: async (contributionId, type, amount) => {
    return await axios.put(
      process.env.REACT_APP_API_BASE_URL + "/contribution/" + contributionId,
      {
        type,
        amount
      },
      { headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` } }
    );
  },
  deleteCategory: async contributionId => {
    return await axios.delete(
      process.env.REACT_APP_API_BASE_URL + "/contribution/" + contributionId,
      {
        headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` }
      }
    );
  },
  getAllBudgetStats: async () => {
    return await axios.get(
      process.env.REACT_APP_API_BASE_URL + "/contribution/",
      {
        headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` }
      }
    );
  }
};

export default contributionApi;
