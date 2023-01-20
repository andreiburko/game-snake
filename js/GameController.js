class GameController {
  constructor(container, model) {
    this.snakeContainer = container;
    this.snakeModel = model;
    this.renderComponents();
    this.updatePage();
    this.setListeners();
  }

  renderComponents() {
    this.snakeModel.renderComponents();
  }

  updatePage() {
    const hashPageName = location.hash.slice(1).toLowerCase();
    this.snakeModel.updatePage(hashPageName);
    if (hashPageName === "records") {
      this.snakeModel.getBestPlayers();
    }
  }

  setListeners() {
    window.addEventListener("hashchange", this.updatePage.bind(this));

    document.addEventListener("keydown", this.setSnakeDirection.bind(this));

    this.snakeContainer.addEventListener("click", this.parseClick.bind(this));

    window.addEventListener("beforeunload", this.askUserBeforeUnload.bind(this));

    window.addEventListener("popstate", this.askBeforeGoForwardOrBack.bind(this));
  }

  setSnakeDirection(event) {
    this.snakeModel.setSnakeDirection(event.code, location.hash.slice(1).toLowerCase());
  }

  parseClick(event) {
    switch (true) {
      case (event.target.id === "signup-link"):
        event.preventDefault();
        this.snakeModel.showSiginUpForm();
        break;
      case (event.target.id === "login-link"):
        event.preventDefault();
        this.snakeModel.showLoginForm();
        break;
      case (event.target.id === "login-btn"):
        event.preventDefault();
        this.checkLoginForm(event.target.id);
        break;
      case (event.target.id === "signup-btn"):
        event.preventDefault();
        this.checkSignupForm(event.target.id);
        break;
      case (event.target.id === "continue-btn"):
        event.preventDefault();
        this.snakeModel.continueGame();
        break;
      case (event.target.className === "level-btn"):
        this.snakeModel.setCurrentRound(event.target.innerText);
        break;
      case (event.target.id === "mute-btn"):
        this.snakeModel.setSound();
        break;
      case (event.target.id === "delete-data-btn"):
        event.preventDefault();
        this.snakeModel.clearData();
      case (event.target.id === "exit-btn"):
        event.preventDefault();
        this.snakeModel.clearLocalStorage();
      default:
        break;
    }
  }

  checkLoginForm(btnId) {
    const emailInput = this.snakeContainer.querySelector("#login-email-input");
    const passwordInput = this.snakeContainer.querySelector("#login-password-input");
    this.snakeModel.checkLoginForm(emailInput.value, emailInput.id, passwordInput.value, passwordInput.id, btnId);
  }

  checkSignupForm(btnId) {
    const nameInput = this.snakeContainer.querySelector("#signup-name-input");
    const emailInput = this.snakeContainer.querySelector("#signup-email-input");
    const passwordInput = this.snakeContainer.querySelector("#signup-password-input");
    this.snakeModel.checkSignupForm(nameInput.value, nameInput.id, emailInput.value, emailInput.id, passwordInput.value, passwordInput.id, btnId);
  }

  askUserBeforeUnload(event) {
    this.snakeModel.askUserBeforeUnload(event);
  }

  askBeforeGoForwardOrBack() {
    this.snakeModel.askBeforeGoForwardOrBack();
  }
};