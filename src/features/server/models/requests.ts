type RequestCode = 4 | 5 | 6 | 8

const REQUESTS = {
  STUDENT_REQUEST_FOR_CHAT: 4,
	STUDENT_RECONNECT: 5,
	SEND_MESSAGE: 6,
	END_CONVERSATION: 8,
}
Object.freeze(REQUESTS)

type Message = {
  type: Event,
  metadata: {
    type: 'student'
    identity: string
  }
}

type ChatRequest = {
  type: 4,
}

type ChatMessage = {
  type: 6,
  metadata: {
    type: 'student',
    identity: string
  },
  payload: {
    message: string,
  }
}

type ReconnectRequest = {
  type: 5,
  metadata: {
    type: 'student',
    identity: string
  }
}

type EndConversationRequest = {
  type: 7,
  metadata: {
    type: 'student',
    identity: string,
  }
}

export type { 
  RequestCode,
  ChatRequest,
  ChatMessage,
  ReconnectRequest,
  EndConversationRequest
}

export { REQUESTS }