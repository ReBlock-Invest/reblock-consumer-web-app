import { App, Modal, Skeleton } from "antd"
import React, { useEffect, useState } from "react"
import PersonalInlineInquiry from "../PersonaInlineInquiry"
import { useQuery } from "react-query"
import useRepositories from "hooks/useRepositories"

type Props = {}

const PersonalInquiryModal: React.FC<Props> = () => {
  const { message } = App.useApp()
  
  const repositories = useRepositories()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const {data: userInfoData} = useQuery({
    queryKey: ['userinfo'],
    queryFn: () => repositories.authenticationRepository?.getUserInfo(),
    enabled: !!repositories.authenticationRepository?.getIsAuthenticated(),
  })

  useEffect(() => {
    if (userInfoData && !userInfoData.invest_state) {
      setOpen(true)
    }
  }, [userInfoData])

  return (
    <Modal
      title="Basic Modal"
      open={open}
      footer={null}
      onCancel={() => setOpen(false)}
    >
      {isLoading ? (
        <Skeleton active />
      ) : null}
      <PersonalInlineInquiry
        onComplete={() => {
          message.success("Congratulations! KYC Step is completed!")
          setOpen(false)
        }}
        onError={() => {
          message.error("Ooops! KYC Step is failed!")
          setOpen(false)
        }}
        onLoad={() => setIsLoading(false)}
      />
    </Modal>
  )
}

export default PersonalInquiryModal