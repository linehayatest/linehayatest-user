type ServerEvent = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

const EVENTS = {
  CHAT_REQUEST_ACCEPTED: 1,
  CHAT_MESSAGE: 2, 
  PARTY_HAS_RECONNECT: 3,
	PARTY_HAS_DISCONNECT: 4,
	PARTY_HAS_TIMEOUT: 5,
	PARTY_HAS_END_CONVERSATION: 6,
	DASHBOARD_STATUS_UPDATE: 7,
	CHAT_REQUEST_REPLY: 8,
}
Object.freeze(EVENTS)

type ChatRequestReply = {
  type: 8,
  userId: number
}

type ChatMessage = {
  type: 2,
  message: string
}


export type { 
  ServerEvent,
  ChatMessage,
  ChatRequestReply,
}

export { EVENTS }