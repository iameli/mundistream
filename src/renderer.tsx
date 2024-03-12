import "./index.css";
import { createRoot } from "react-dom/client";
import Selfbot from "./selfbot";
import Main from "./main";

const root = createRoot(document.querySelector("main"));
root.render(<Main />);
