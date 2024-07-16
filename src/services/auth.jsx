import React, { useEffect, useState } from 'react'

const useAuth = () => {

  const [token, setToken] = useState(null);

  useEffect(() => {
    const parseToken = () => {
      try {
        const storedToken = localStorage.getItem("token")

        if (storedToken) {
          setToken(storedToken);

          const [header, payload, signature] = storedToken.split(".");
          const decodedPayload = atob(payload);

          const parsedTokenData = JSON.parse(decodedPayload);

          if (parsedTokenData && parsedTokenData.exp) {
            const currentTime = Math.floor(Date.now() / 1000);

            if (parsedTokenData.exp < currentTime) {


              console.log("expired")

              localStorage.removeItem("token")
              location.href = "/login";

            }
          }
        }


      } catch (error) {
        // Handle parsing errors if needed
        console.error("Error parsing token data", error);
      }
    };

    parseToken();
  }, [token]);

  return { token };
}

export default useAuth