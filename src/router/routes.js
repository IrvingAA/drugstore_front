import auth from "./auth/auth";
import main from "./drugstore/main"
import unknown from "./utils/unknown";
const routes = [
  {...auth},
  {...main},
  {...unknown},
]

export default routes
