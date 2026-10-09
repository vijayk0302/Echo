import { useNavigate } from "react-router-dom";

const useRedirect = () => {
  const navigate = useNavigate();

  const handlenavigate = (path) => {
    navigate(path);
  };
  return {handlenavigate};

};

export default useRedirect;
