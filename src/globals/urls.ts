// change this line to switch between local and production development
let ENVIRONMENT = 'production'

// change this line too
const URLS = ENVIRONMENT === 'local' ? (
  {
    BASE: "http://localhost:3003",
    SOCKET: "ws://localhost:8050/ws",
    REST: "http://localhost:8050",
  }
) : (
  {
    BASE: "https://linehayat.vercel.app",
    SOCKET: "wss://linehayat-server-1.herokuapp.com/ws",
    REST: "https://linehayat-server-1.herokuapp.com",
  }
)

const BASE_URL = URLS.BASE
const SOCKET_URL = URLS.SOCKET
const REST_URL = URLS.REST

export {
  BASE_URL,
  SOCKET_URL,
  REST_URL,
}