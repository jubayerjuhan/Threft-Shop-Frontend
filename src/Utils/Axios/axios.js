import axios from "axios";

export const Server = axios.create({
  baseURL: 'https://mern-ecom-store.herokuapp.com',
  headers: { "Content-Type": "application/json" }
});
let auth = ""
if (localStorage.token) {
  const { token, expiry } = JSON.parse(localStorage.token)
  auth = `${token} ${expiry}`;
}
let headers = {
  Authorization: "Bearer ",
};
if (localStorage.token) {
  const { token, expiry } = JSON.parse(localStorage.token)
  headers = {
    Authorization: `Bearer ${localStorage.token ? token : null
      } ${localStorage.token && expiry
      } `,
  }
}


export const authAxios = axios.create({
  baseURL: 'https://mern-ecom-store.herokuapp.com',
  headers,
})
export const loginReq = axios.create({
  baseURL: 'https://mern-ecom-store.herokuapp.com',
  headers: { "Content-Type": "application/json" }
});

export const formData = axios.create({
  baseURL: 'https://mern-ecom-store.herokuapp.com',
  headers: {
    "Authorization": `Bearer ${auth}`,
    "Content-Type": "application/json",
  }
});