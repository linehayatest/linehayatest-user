import Peer from 'peerjs'
import { useToast } from '@chakra-ui/react'

import history from '@globals/history'
import useRequestCall from '@features/call/hooks/useRequestCall'
import useStreamStore from '../stores/streamStore'
import usePeerIdStore from '../stores/peerIdStore'
import useUserStateStore from '@features/user/stores/stateStore'
import usePeerConnStore from '../stores/peerConnStore'

type setupPeerProps = {
  peer: Peer,
  localAudio: React.MutableRefObject<null|HTMLAudioElement>,
  remoteAudio: React.MutableRefObject<null|HTMLAudioElement>,
}

function useSetupPeer() {
  const requestCall = useRequestCall()
  const setPeerId = usePeerIdStore(state => state.setPeerId)
  const {localStream, setStream} = useStreamStore(state => ({
    localStream: state.stream,
    setStream: state.setStream,
  }))
  const setUserState = useUserStateStore(state => state.setUserState)
  const setPeerConn = usePeerConnStore(state => state.setPeerConn)
  const toast = useToast()

  return ({ peer, localAudio, remoteAudio }: setupPeerProps) => {
    if (localStream === null) {
      navigator.mediaDevices.getUserMedia({ video: false, audio: { echoCancellation: true }})
      .then(stream => {
        setStream(stream)
        localAudio.current.srcObject = stream
        localAudio.current.autoplay = false
        requestCall()
      })
      .catch(err => console.error("Unable to get user media" + err))
    }

    peer.on('open', (id: string) => {
      setPeerId(id)
      if (localStream !== null) {
        requestCall()
      }
    })

    peer.on('call', call => {
      call.answer(localStream)
      call.peerConnection.oniceconnectionstatechange = () => {
        if (call.peerConnection.iceConnectionState === 'disconnected') {
          setUserState('idling')
          toast({
            description: "Volunteer has hanged up",
            status: "error"
          })
          call.close()
        }
      }

      call.on('stream', remoteStream => {
        setPeerConn(call)
        localAudio.current.muted = true
        remoteAudio.current.muted = false
        remoteAudio.current.srcObject = remoteStream 
        remoteAudio.current.autoplay = true
        setUserState('calling')
      })
    })

    peer.on('connection', connection => {
      connection.on('close', () => {
        setUserState('idling')
        history.push('/')
        toast({
          description: "Volunteer has hanged up",
          status: "error"
        })
      })
    })
  }
}

export default useSetupPeer