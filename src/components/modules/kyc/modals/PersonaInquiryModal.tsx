import { Modal } from "antd"
import React from "react"
import PersonalInlineInquiry from "../PersonaInlineInquiry"
import { Field, InquiryAttributes } from "persona/dist/lib/interfaces"

type Props = {
  open: boolean
  onComplete: (params: {inquiryId: string, status: string, fields: Record<string, Field> | InquiryAttributes}) => void
  onError: () => void
  onCancel: () => void
}

const PersonalInquiryModal: React.FC<Props> = ({open, onComplete, onError, onCancel}) => {
  return (
    <Modal title="Basic Modal" open={open} footer={null} onCancel={onCancel}>
      <PersonalInlineInquiry onComplete={onComplete} onError={onError} />
    </Modal>
  )
}

export default PersonalInquiryModal