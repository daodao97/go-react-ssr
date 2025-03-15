import { Privacy } from "../components/Privacy";
import { createServerRenderer } from "../lib/ServerRender";

globalThis.Render = createServerRenderer({ Component: Privacy });
