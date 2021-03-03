import useAuth from "../../hooks/useAuth";

const HomeNav = () => {
  const auth = useAuth();
 console.log(auth)
  return (
    <div id="homenav">
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

export default HomeNav;
