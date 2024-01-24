// src/QRCodeModal.tsx
import React from 'react'
import Modal from 'react-modal'
import QRCode from 'react-qr-code'
import { IModalProps } from '../types/types'

export const QRCodeModal: React.FC<IModalProps> = (props) => {
  const { isModalShow, closeModal, qrValue, manualCode } = props

  return (
    <div>
      <Modal
        isOpen={isModalShow}
        onAfterOpen={() => {}}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Payment'
      >
        <div style={{ background: 'white', padding: '16px', borderRadius: 10 }}>
          <button
            onClick={closeModal}
            style={{
              position: 'absolute',
              right: 10,
              top: 10,
              borderWidth: 0,
              backgroundColor: 'transparent'
            }}
          >
            <text style={{ fontSize: 18, fontWeight: 'bolder' }}>X</text>
          </button>
          <QRCode value={qrValue} />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '16px'
            }}
          >
            <text style={{ fontSize: 22, fontWeight: 'bold' }}>
              {'Code: ' + manualCode}
            </text>
          </div>
        </div>
      </Modal>
    </div>
  )
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 999
  }
}

export default QRCodeModal
