interface IUniversity {
  country: string;
  'state-province': string;
  web_pages: Array<string>;
  alpha_two_code: string;
  name: string;
  domains: Array<string>;
}

interface IUniversityAPIParams {
  country: string;
  name?: string;
}
