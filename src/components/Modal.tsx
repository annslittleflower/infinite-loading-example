import { useEffect } from 'react';
import { createPortal } from 'react-dom'

export interface ModalProps {
  onClose: () => void;
  children: React.ReactNode
}

const Modal = ({onClose, children}: ModalProps) => {
  useEffect(() => {
    document.body.classList.toggle('noscroll', true)
    return () => {
      document.body.classList.toggle('noscroll', false)
    }
  }, [])

  const closeModal = () => {
    onClose()
  }

  return createPortal(
    <div className="modal-wrapper" onClick={closeModal}>
      <div className="close-modal">x</div>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.getElementById('modal-portal') as HTMLElement
  )
}

export default Modal

