import { App, Modal, Skeleton } from "antd"
import React, { useEffect, useState } from "react"
import PersonalInlineInquiry from "../PersonaInlineInquiry"
import { useQuery } from "react-query"
import useRepositories from "hooks/useRepositories"
import useKYCStore from "stores/useKYCStore"
import UserInvestStateEnum from "entities/user/UserInvestStateEnum"

type Props = {}

const PersonalInquiryModal: React.FC<Props> = () => {
  const { message } = App.useApp()
  
  const repositories = useRepositories()
  const {isShowKYCModal, setIsShowKYCModal} = useKYCStore()
  const [isLoading, setIsLoading] = useState(true)

  const {data: userInfoData} = useQuery({
    queryKey: ['userinfo'],
    queryFn: () => repositories.authenticationRepository?.getUserInfo(),
    enabled: !!repositories.authenticationRepository?.getIsAuthenticated(),
  })

  useEffect(() => {
    if (userInfoData?.invest_state !== UserInvestStateEnum.KYC_VERIFIED) {
      setIsShowKYCModal(true)
    }
  }, [setIsShowKYCModal, userInfoData])

  return (
    <Modal
      title="Basic Modal"
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