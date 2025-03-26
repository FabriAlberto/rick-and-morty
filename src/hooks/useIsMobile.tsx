import { useState, useEffect } from "react";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640); 
    };

    checkIfMobile(); 

    window.addEventListener("resize", checkIfMobile); 

    return () => {
      window.removeEventListener("resize", checkIfMobile); 
    };
  }, []);

  return isMobile;
};

export default useIsMobile;