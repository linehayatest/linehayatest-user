type readyState =
  typeof ReadyState.CONNECTING |
  typeof ReadyState.OPEN |
  typeof ReadyState.CLOSING |
  typeof ReadyState.CLOSED;

const ReadyState = {
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3
}
Object.freeze(ReadyState);

export default ReadyState

export type {
  readyState
}