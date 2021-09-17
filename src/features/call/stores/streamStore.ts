import create from 'zustand'

type StreamStore = {
  stream: MediaStream | null,
  setStream: (s: MediaStream) => void,
}

const useStreamStore = create<StreamStore>(
  set => ({
    stream: null,
    setStream: (s) => set({ stream: s }),
  })
)

export default useStreamStore