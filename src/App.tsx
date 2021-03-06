import React from "react";
import AppScaffold from "./AppScaffold";
import ThemeContextProvider from "./context/ThemeProvider";

function App() {
  return (
  <ThemeContextProvider>
      <AppScaffold/>
  </ThemeContextProvider>
  )
}

export default App;
