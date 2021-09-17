import create from 'zustand'

type PeerIdStore = {
  peerId: string,
  setPeerId: (id: string) => void,
}

const usePeerIdStore = create<PeerIdStore>(
  set => ({
    peerId: "",
    setPeerId: (s) => set({ peerId: s }),
  })
)

export default usePeerIdStore