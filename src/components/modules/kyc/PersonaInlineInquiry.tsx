import useRepositories from 'hooks/useRepositories';
import Persona from 'persona';
import { Field, InquiryAttributes } from 'persona/dist/lib/interfaces';
import { useQuery } from 'react-query';

type Props = {
  onComplete: (params: {inquiryId: string, status: string, fields: Record<string, Field> | InquiryAttributes}) => void
  onError: () => void
  onLoad: () => void
}

const PersonalInlineInquiry: React.FC<Props> = ({onComplete, onError, onLoad}) => {
  const repositories = useRepositories()
  const { data: userInfoData } = useQuery({
    queryKey: ['userinfo'],
    queryFn: () => repositories.authenticationRepository?.getUserInfo(),
    enabled: !!repositories.authenticationRepository?.getIsAuthenticated(),
  })

  return (
    <div className="persona-wrapper">
      <Persona.Inquiry
        templateId={process.env.REACT_APP_KYC_PERSONA_TEMPLATE_ID}
        environmentId={process.env.REACT_APP_KYC_PERSONA_ENV_ID}
        referenceId={userInfoData?.address}
        onLoad={onLoad}
        onComplete={onComplete}
        onError={onError}
      />
    </div>
	);
};

export default PersonalInlineInquiry

