import { About } from "../components/About";
import { createServerRenderer } from "../lib/ServerRender";

globalThis.Render = createServerRenderer({ Component: About });
