import CompanysData from '../../Data/CompanyData.json';

export const COMPANY_DETAILS = 'COMPANY_DETAILS';

export const companyDetails = () => {
  return {
    type: COMPANY_DETAILS,
    payload: CompanysData,
  };
};
