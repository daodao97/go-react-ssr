import { createServerRenderer } from "../lib/ServerRender";
import { Home } from "../components/Home";

globalThis.Render = createServerRenderer({ Component: Home });
