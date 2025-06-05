'use client'

interface TermsAndConditionsProps {
  isAgreed: boolean;
  setIsAgreed: (value: boolean) => void;
}
const TermsAndConditions = ({

    isAgreed,
    setIsAgreed,

}: TermsAndConditionsProps) => {
    return (
      <div className="flex items-center mb-4 text-white">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={isAgreed}
            onChange={(e) => setIsAgreed(e.target.checked)}
            className="mr-2"
          />
          I agree to the terms and privacy policy
        </label>
      </div>
    );
  };
  export default TermsAndConditions;
