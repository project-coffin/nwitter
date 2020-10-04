import React from "react";
import MyRouter from "./Router";
import { authService } from "fb";

function App() {
  const [init, setInit] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    authService.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
      setInit(true);
    });
  }, []);

  return (
    <div>
      {init ? <MyRouter isLoggedIn={isLoggedIn} /> : <h3>Initializing...</h3>}
    </div>
  );
}

export default App;
