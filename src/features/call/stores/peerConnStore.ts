import create from 'zustand'
import Peer from 'peerjs'

type PeerConnStore = {
  peerConn: Peer.MediaConnection | null
  setPeerConn: (conn: Peer.MediaConnection) => void,
}

const usePeerConnStore = create<PeerConnStore>(
  set => ({
    peerConn: null,
    setPeerConn: (s) => set({ peerConn: s }),
  })
)

export default usePeerConnStore