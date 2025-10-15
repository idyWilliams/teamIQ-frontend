import React from "react";


type App = {
  name: string;
  logo: string;
  description: string;
};
function Details({ app }: { app: App | null }) {
  return <div>On God {app?.name}</div>;
}

export default Details;
