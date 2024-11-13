// import CompanysData from '../../Data/CompanyData.json';
import CompanysData from '../../Constant/Data/CompanyData.json'
export const JOB_POST = 'JOB_POST';
export const SELECT_JOB = 'SELECT_JOB';
export const jobPost = () => {
  return {
    type: JOB_POST,
    payload: CompanysData.jobs, // Access the 'Company' array in the JSON
  };
};
export const selectJob = job => {
  return {
    type: SELECT_JOB,
    payload: job,
  };
};
