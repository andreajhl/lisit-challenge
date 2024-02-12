import { useSearchParams, useLocation } from "react-router-dom";

export const useQueryParams = () => {
  const location = useLocation();
  const [, setSearchParams] = useSearchParams();

  const searchParams = new URLSearchParams(location.search);
  const querysAll = [...searchParams.entries()];

  const queryParams = querysAll.reduce((acc, [key, value]) => { 
    acc[key] = value;
    return acc;
  }, {});

  return {
    querys: queryParams,
    setQuery: setSearchParams
  }
};
