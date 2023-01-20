// Components list (from components.js)
const components = {
  logo: LogoGame,
  loader: Loader,
  content: Content,
}

// Routes list (from pages.js)
const routes = {
  signIn: AutorizationPage,
  main: HomePage,
  rounds: RoundsPage,
  game: GamePage,
  records: RecordsPage,
  rules: RulesPage,
  about: AboutPage,
  error: ErrorPage,
  default: HomePage,
}

// SPA module
const mySPA = (function() {
  // Public methods
  return {
    init: function({ container, routes, components }) {
      const view = new GameView(document.getElementById(container), routes, components);
      const model = new GameModel(view);
      const controller = new GameController(document.getElementById(container), model);
    }
  };
}());

// Init module
document.addEventListener("DOMContentLoaded", mySPA.init({
  container: "root",
  routes: routes,
  components: components,
}));