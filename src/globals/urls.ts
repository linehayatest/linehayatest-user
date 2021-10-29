// change this line to switch between local and production development
const ENVIRONMENT = 'production'

const URLS = ENVIRONMENT === 'local' ? (
  {
    BASE: "http://localhost:3003",
    SOCKET: "ws://localhost:8050/ws",
    REST: "http://localhost:8050",
  }
) : (
  {
    BASE: "https://linehayat.netlify.app",
    SOCKET: "wss://linehayatest.herokuapp.com/ws",
    REST: "https://linehayatest.herokuapp.com",
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