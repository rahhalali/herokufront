import React from "react";
import { useHistory } from "react-router";
export const EditTeam = () => {
  const history = useHistory();
  return (
    <div>
      {
        localStorage.getItem("login")  ? (      <div className="registrationcontainer">
        <div className="registrationbox regtitle">Edit Team</div>
        <div className="registrationbox">
          <label for="editteam">Team Name</label>
          <br />
          <input
            type="text"
            placeholder="Enter your team name"
            name="editteam"
            id="editteam"
          />
        </div>

        <div className="registrationbox">
          <button type="submit" className="regsub">
            Submit
          </button>
        </div>
      </div>) :(history.push("/"))
      }

    </div>
  );
};
