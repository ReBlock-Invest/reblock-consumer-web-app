import Persona from 'persona';
import { Field, InquiryAttributes } from 'persona/dist/lib/interfaces';

type Props = {
  onComplete: (params: {inquiryId: string, status: string, fields: Record<string, Field> | InquiryAttributes}) => void
  onError: () => void
}

const PersonalInlineInquiry: React.FC<Props> = ({onComplete, onError}) => {
  return (
    <div className="persona-wrapper">
      <Persona.Inquiry
        templateId={process.env.REACT_APP_KYC_PERSONA_TEMPLATE_ID}
        environmentId={process.env.REACT_APP_KYC_PERSONA_ENV_ID}
        onLoad={() => { 
          console.log('Loaded inline');
        }}
        onComplete={onComplete}
        onError={onError}
      />
    </div>
	);
};

export default PersonalInlineInquiry

