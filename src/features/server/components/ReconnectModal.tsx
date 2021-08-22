import React from 'react'
import { Button, Modal, ModalOverlay, ModalBody, ModalContent, ModalHeader, ModalFooter, ModalCloseButton } from "@chakra-ui/react"
import create from 'zustand'
import useUserStateStore from '@features/user/stores/stateStore'
import useResetUser from '@features/user/hooks/useResetUser'
import useEndConversation from '../hooks/useEndConversation'
import useSetupWebSocket from '../hooks/useSetupWebSocket'
import history from '@globals/history'

type contentType = 'volunteer-ended-conversation' | 'last-session-active' | 'last-session-ended'

type ReconnectModalStore = {
  isOpen: boolean,
  onClose: () => void,
  onOpen: () => void,
  modalContent: contentType,
  setModalContent: (s: contentType) => void,
}

const useReconnectModalStore = create<ReconnectModalStore>(set => ({
  isOpen: false,
  onClose: () => { set({ isOpen: false }) },
  onOpen: () => { set({ isOpen: true })},
  modalContent: 'last-session-ended',
  setModalContent: (s) => { set({ modalContent: s })},
}))

type ModalContentProps = {
  modalContent: contentType
}
function ReconnectModalContent({ modalContent }: ModalContentProps) {
  const onClose = useReconnectModalStore(state => state.onClose)
  const setUserState = useUserStateStore(state => state.setUserState)
  const resetUser = useResetUser()
  const endConversation = useEndConversation()
  const setupWebSocket = useSetupWebSocket({ onClose: () => {}, onMessage: () => {}})


  const handleEndConversation = () => {
    endConversation()
    setUserState('finish-chatting')
    onClose()
  }

  const handleReconnect = () => {
    setupWebSocket()
    history.push("/chat")
    onClose()
  }

  switch(modalContent) {
    case 'last-session-active': {
      return (
        <ModalContent>
          <ModalHeader>Your last chat session has not ended</ModalHeader>
          <ModalBody>Do you still want to continue?</ModalBody>
          <ModalFooter>
            <Button onClick={handleEndConversation}>No, end conversation</Button>
            <Button onClick={handleReconnect}>Yes, continue</Button>
          </ModalFooter>
        </ModalContent>
      )
    }
    case 'last-session-ended': {
      return (
        <ModalContent>
          <ModalHeader>Your last chat session has been ended</ModalHeader>
          <ModalBody>The session ended due to the volunteer ended it or you are disconnected for too long</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Ok, thanks.</Button>
          </ModalFooter>
        </ModalContent>
      )
    }
    case 'volunteer-ended-conversation': {
      return (
        <ModalContent>
          <ModalHeader>Volunteer has ended the conversation</ModalHeader>
          <ModalBody>Don't forget to leave a feedback</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Ok</Button>
          </ModalFooter>
        </ModalContent>
      )
    }
  }
}

function ReconnectModal() {
  const { isOpen, onClose, modalContent } = useReconnectModalStore(state => ({
    isOpen: state.isOpen,
    onClose: state.onClose,
    modalContent: state.modalContent
  }))

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ReconnectModalContent modalContent={modalContent} />
    </Modal>
  )
}

export default ReconnectModal
export {
  useReconnectModalStore
}