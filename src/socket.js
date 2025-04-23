import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'production' ? undefined : 'https://ab13c7b2da5cc71b7362d19137a76881.serveo.net/'
const URL = process.env.NODE_ENV === 'production' ? undefined : 'https://meet-assist-api.tipstat.com/'



export const socket = io(URL, { autoConnect: false });