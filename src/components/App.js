import React from "react";
import MyRouter from "./Router";
import { authService } from "fb";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(!!authService.currentUser);

  return (
    <div>
      <MyRouter isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default App;
