import React from "react";
import MyRouter from "./Router";
import { authService } from "fb";

function App() {
  const [init, setInit] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [viewer, setViewer] = React.useState(null);

  React.useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setViewer(user);
      }
      setIsLoggedIn(!!user);
      setInit(true);
    });
  }, []);

  return (
    <div>
      {init ? (
        <MyRouter isLoggedIn={isLoggedIn} viewer={viewer} />
      ) : (
        <h3>Initializing...</h3>
      )}
    </div>
  );
}

export default App;
