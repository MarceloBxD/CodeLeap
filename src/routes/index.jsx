import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Main from "../screens/Main";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/main",
    element: <Main />,
    
  },
]);

export default router;
