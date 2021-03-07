import React from 'react';
import useAuth from "../../hooks/useAuth";
import useTheme from "../../hooks/useTheme";

const HomeNav = () => {
  const auth = useAuth();
  const { theme } = useTheme();
  return (
    <div id="homenav" style={{backgroundColor:theme.homenav}}>

      <div style={{ display: "flex", alignItems: "center" }}>
        {auth?.user ? (
          <>
            <img src={auth?.user.photo} alt={auth?.user.nname} id="useravatar" />
            <span id="username">{auth?.user.nname}</span>
          </>
        ) : (
          <>
            <img src="icon-72x72.png" alt="guest" id="useravatar" />
            <span id="username">Guest</span>
          </>
        )}
      </div>
      <h3>Alpha Chess</h3>
    </div>
  );
};

export default React.memo(HomeNav);
