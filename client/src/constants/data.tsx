import { State } from "../logic/types";

// Define here state values to initialize the App with
const INITIAL_STATE: State = {
  mode: "light",
  appId: "DEFAULT",
  data: undefined,
  bgIndex: 0,
};

const PATHS = {
  root: "/",
  home: "/home",
  login: "/login",
};

export { INITIAL_STATE, PATHS };
