import React from "react";

export default function Intro() {
  return (
    <div>
      <h1> Welcome to Visualive. </h1>
      <form>
        <label>
          {" "}
          Streamer Name:
          <input type="text" name="name" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
