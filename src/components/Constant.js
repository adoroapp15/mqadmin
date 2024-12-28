// Constants.js
const prod = {
  //API_URL: "https://wallet-eight-pied.vercel.app",
  API_URL: "https://api.adoro.social",
};

const dev = {
  API_URL: "http://localhost:8000",
};
export const config = process.env.NODE_ENV === 'development' ? prod : prod;

//export const config = dev;
