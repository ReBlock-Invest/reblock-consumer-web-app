import { Modal, Skeleton } from "antd"
import React, { useState } from "react"
import PersonalInlineInquiry from "../PersonaInlineInquiry"
import { Field, InquiryAttributes } from "persona/dist/lib/interfaces"

type Props = {
  open: boolean
  onComplete: (params: {inquiryId: string, status: string, fields: Record<string, Field> | InquiryAttributes}) => void
  onError: () => void
  onCancel: () => void
}

const PersonalInquiryModal: React.FC<Props> = ({open, onComplete, onError, onCancel}) => {
  const [isLoading, setIsLoading] = useState(true)
  return (
    <Modal title="Basic Modal" open={open} footer={null} onCancel={onCancel}>
      {isLoading ? (
        <Skeleton active />
      ) : null}
      <PersonalInlineInquiry
        onComplete={onComplete}
        onError={onError}
        onLoad={() => setIsLoading(false)}
      />
    </Modal>
  )
}

export default PersonalInquiryModal