import { App, Modal, Skeleton } from "antd"
import React, { useState } from "react"
import PersonalInlineInquiry from "../PersonaInlineInquiry"
import useKYCStore from "stores/useKYCStore"

type Props = {}

const PersonalInquiryModal: React.FC<Props> = () => {
  const { message } = App.useApp()
  
  const {isShowKYCModal, setIsShowKYCModal} = useKYCStore()
  const [isLoading, setIsLoading] = useState(true)

  return (
    <Modal
      title="Identity Verification"
      open={isShowKYCModal}
      footer={null}
      onCancel={() => setIsShowKYCModal(false)}
    >
      {isLoading ? (
        <Skeleton active />
      ) : null}
      <PersonalInlineInquiry
        onComplete={() => {
          message.success("Congratulations! KYC Step is completed!")
          setIsShowKYCModal(false)
        }}
        onError={() => {
          message.error("Ooops! KYC Step is failed!")
          setIsShowKYCModal(false)
        }}
        onLoad={() => setIsLoading(false)}
      />
    </Modal>
  )
}

export default PersonalInquiryModal