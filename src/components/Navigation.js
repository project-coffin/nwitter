import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ viewer }) => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/profile">{viewer?.displayName} Profile</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
