import { useEffect, MouseEvent, useRef } from 'react';
import { createPortal } from 'react-dom'

export interface ModalProps {
  onClose: () => void;
  children: React.ReactNode
}

const Modal = ({onClose, children}: ModalProps) => {

  const backgroundRef = useRef(null)

  useEffect(() => {
    document.body.classList.toggle('noscroll', true)
    return () => {
      document.body.classList.toggle('noscroll', false)
    }
  }, [])

  const closeModal = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as Node) === backgroundRef.current) {
      onClose()
    }
  }

  return createPortal(
    <div
      className="modal-wrapper"
      onClick={closeModal}
      ref={backgroundRef}
    >
      <div className="close-modal" onClick={onClose}>x</div>
      <div className="modal-content">
        {children}
      </div>
    </div>,
    document.getElementById('modal-portal') as HTMLElement
  )
}

export default Modal

