import React from "react";
import MovieList from "./MovieList";
import TheatreTables from "./TheatreTables";
import { Tabs } from "antd";

function Admin() {
  const tabItems = [
    {
      key: "1",
      label: "Movies",
      children: <MovieList />,
    },
    {
      key: "2",
      label: "Theatres",
      children: <TheatreTables />,
    },
  ];
  return (
    <div>
      <h1>Admin Page</h1>
      <Tabs items={tabItems} />
    </div>
  );
}

export default Admin;
