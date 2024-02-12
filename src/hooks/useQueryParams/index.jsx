import { useSearchParams, useLocation } from "react-router-dom";
import { getQuerysUrl } from "../../utils/urls";

export const useQueryParams = () => {
  const location = useLocation();
  const [, setSearchParams] = useSearchParams();

  return {
    querys: getQuerysUrl(location.search),
    setQuery: setSearchParams
  }
};
