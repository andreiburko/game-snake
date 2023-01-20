class GameModel {
  constructor(view) {
    this.snakeView = view;
    this.user = {};
    this.gameEnd = true;
    this.snakeDirection = null;
    this.intervalId = null;
    this.callCommandForwardOrBack = false;
    this.soundOn = false;
    this.backgroundSound = new Audio("sounds/main-theme.mp3");
    this.eatingFoodSound = new Audio("sounds/eating-food.mp3");
    this.hittingWall = new Audio("sounds/scream.mp3");
    this.losingRound = new Audio("sounds/lose-round.mp3");
    this.winningRound = new Audio("sounds/won-round.mp3");
  }

  renderComponents() {
    this.snakeView.renderComponents();
    this.backgroundSound.load();
    this.eatingFoodSound.load();
    this.hittingWall.load();
    this.losingRound.load();
    this.winningRound.load();
  }

  updatePage(pageName) {
    if (localStorage.getItem("snakePlayerData")) {
      this.user = JSON.parse(localStorage.getItem("snakePlayerData"));
      this.checkLocalStoragePage(pageName);
    } else {
      this.createPage("signIn");
    }
  }

  checkLocalStoragePage(pageName) {
    let hashName = pageName;
    if (localStorage.getItem("snakeCurrentPage") === "game" && hashName === "game" && !this.callCommandForwardOrBack) {
      clearInterval(this.intervalId);
      window.location.hash = "rounds";
      hashName = "rounds";
    }
    this.createPage(hashName);
  }

  createPage(pageName) {
    let routeName = "main";
    if (pageName.length > 0) {
      routeName = pageName in routes ? pageName : "error";
    }

    this.setPageToLocalStorage(routeName);
    this.snakeView.createPage(routeName, this.user);

    switch (true) {
      case (routeName === "rounds"):
        this.snakeView.updateLevelBtns(this.user.level);
        break;
      case (routeName === "game"):
        if (this.gameEnd) {
          this.startGame();
        }
        break;
      default:
        break;
    }
  }

  setPageToLocalStorage(pageName) {
    localStorage.setItem("snakeCurrentPage", pageName);
  }

  showLoginForm() {
    this.snakeView.showLoginForm();
  }

  showSiginUpForm() {
    this.snakeView.showSiginUpForm();
  }

  checkLoginForm(emailValue, emailId, passwordValue, passwordId, btnId) {
    const regEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    let email = emailValue;
    let password = passwordValue;

    this.snakeView.showError(emailId, "");
    this.snakeView.showError(passwordId, "");
    this.snakeView.showError(btnId, "");

    switch (true) {
      case (!regEmail.test(emailValue)):
        this.snakeView.showError(emailId, "Invalid email");
        email = null;
        break;
      case (passwordValue.length < 5):
        this.snakeView.showError(passwordId, "Password is short");
        password = null;
        break;
      case (passwordValue.includes(" ")):
        this.snakeView.showError(passwordId, "Spaces isn't allowed");
        password = null;
        break;
      case (email !== null && password !== null):
        this.loginUser(email, password, btnId);
        break;
      default:
        break;
    }
  }

  loginUser(email, password, btnId) {
    this.snakeView.showLoader();

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          this.readUserDB(user.uid);
        }})
      .catch((error) => {
        setTimeout(() => this.snakeView.hideLoader(), 500);
        console.log("Error: " + error.message);
        this.snakeView.showError(btnId, "Invalid email or password");
      });
  }

  readUserDB(userId) {
    snakeGameDB
      .ref("users/" + userId)
      .once("value")
      .then((snapshot) => {
        this.saveToLocalStorage(snapshot.val().username, userId, snapshot.val().level, snapshot.val().score);
        this.updatePage("main");
      })
      .catch((error) => {
        console.error("Error: " + error.message);
      });
  }

  saveToLocalStorage(name, userId, level = 0, score = 0) {
    const user = {
      name: name,
      id: userId,
      level: level,
      currentRound: 1,
      score: score,
    }
    localStorage.setItem("snakePlayerData", JSON.stringify(user));
  }

  checkSignupForm(nameValue, nameId, emailValue, emailId, passwordValue, passwordId, btnId) {
    const regName = /^[a-zA-Zа-яА-ЯёЁ]{2,15}$/;
    const regEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    let name = nameValue;
    let email = emailValue;
    let password = passwordValue;

    this.snakeView.showError(nameId, "");
    this.snakeView.showError(emailId, "");
    this.snakeView.showError(passwordId, "");
    this.snakeView.showError(btnId, "");

    switch (true) {
      case (nameValue.length < 2):
        this.snakeView.showError(nameId, "Name is short");
        name = null;
        break;
      case (!regName.test(nameValue)):
        this.snakeView.showError(nameId, "Name must contain only letters");
        name = null;
        break;
      case (!regEmail.test(emailValue)):
        this.snakeView.showError(emailId, "Invalid email");
        email = null;
        break;
      case (passwordValue.length < 5):
        this.snakeView.showError(passwordId, "Password is short");
        password = null;
        break;
      case (passwordValue.includes(" ")):
        this.snakeView.showError(passwordId, "Spaces isn't allowed");
        password = null;
        break;
      case (name !== null && email !== null && password !== null):
        this.createUser(name, email, password, btnId);
        break;
      default:
        break;
    }
  }

  createUser(name, email, password, btnId) {
    this.snakeView.showLoader();

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          this.saveToLocalStorage(name, user.uid);
          this.updatePage("main");
          this.saveUserDB(user.uid, name, email);
        }
      })
      .catch((error) => {
        setTimeout(() => this.snakeView.hideLoader(), 500);
        console.error("Error: " + error.message);
        this.snakeView.showError(btnId, "User already exists");
      });
  }

  saveUserDB(userId, name, email) {
    snakeGameDB
      .ref("users/" + userId)
      .set({
        username: name,
        email: email,
        level: 0,
        score: 0,
      })
  }

  setCurrentRound(roundNumber) {
    this.user.currentRound = Number(roundNumber);
    localStorage.setItem("snakePlayerData", JSON.stringify(this.user));
  }

  setSnakeDirection(keyCode, pageName) {
    switch (true) {
      case (keyCode === "ArrowUp" && this.snakeDirection !== "down" && pageName === "game"):
        this.snakeDirection = "up";
        break;
      case (keyCode === "ArrowDown" && this.snakeDirection !== "up" && pageName === "game"):
        this.snakeDirection = "down";
        break;
      case (keyCode === "ArrowRight" && this.snakeDirection !== "left" && pageName === "game"):
        this.snakeDirection = "right";
        break;
      case (keyCode === "ArrowLeft" && this.snakeDirection !== "right" && pageName === "game"):
        this.snakeDirection = "left";
        break;
      default:
        break;
    }
  }

  startGame() {
    this.gameEnd = false;
    this.snakeDirection = null;

    const canvasSize = {
      width: 960,
      height: 660,
      headerHeight: 60,
      cell: 30,
    }

    const round = {
      score: this.user.score,
      slotsInRound: roundsSettings[this.user.currentRound].slots,
      currentCountSlots: 0,
      speed: roundsSettings[this.user.currentRound].speed,
    }

    let food = new Food();

    const snake = {
      elements: [{
        pozX: Math.floor(Math.random() * 32) * canvasSize.cell,
        pozY: Math.floor(Math.random() * 20 + 2) * canvasSize.cell,
      }],
      lastElement: null,
    }

    if (this.soundOn === true) {
      this.backgroundSound.play();
      this.snakeView.setMuteBtnOn();
    }

    this.snakeView.setGameParams(canvasSize, round, food, snake);
    this.snakeView.createCanvas();
    this.snakeView.drawGame();

    function drawGame() {
      if (this.callCommandForwardOrBack) {
        this.snakeView.createCanvas();
      }
      this.callCommandForwardOrBack = false;

      let snakePozX = snake.elements[0].pozX;
      let snakePozY = snake.elements[0].pozY;
      let snakeRadians = null;

      if (snakePozX < 0 || snakePozX > canvasSize.width - canvasSize.cell ||
        snakePozY < canvasSize.headerHeight || snakePozY > canvasSize.height - canvasSize.cell) {
        clearInterval(this.intervalId);
        snake.elements.push(snake.lastElement);
        snake.elements.shift();
        this.gameEnd = true;
        if (this.soundOn) {
          this.hittingWall.play();
        }
        return setTimeout(this.loseRound.bind(this), 1000);
      }

      if (snakePozX === food.pozX && snakePozY === food.pozY) {
        if (this.soundOn) {
          this.eatingFoodSound.play();
        }
        round.score += 10;
        round.currentCountSlots++;
        food = new Food;
      } else {
        snake.lastElement = snake.elements.pop();
      }

      switch (this.snakeDirection) {
        case "left":
          snakePozX -= canvasSize.cell;
          snakeRadians = (90 / 180 * Math.PI);
          break;
        case "right":
          snakePozX += canvasSize.cell;
          snakeRadians = (270 / 180 * Math.PI);
          break;
        case "up":
          snakePozY -= canvasSize.cell;
          snakeRadians = (180 / 180 * Math.PI);
          break;
        case "down":
          snakePozY += canvasSize.cell;
          snakeRadians = 0;
          break;
        default:
          break;
      }

      const snakeHead = {
        pozX: snakePozX,
        pozY: snakePozY,
        radians: snakeRadians,
      }
      snake.elements.unshift(snakeHead);

      for (let i = 1; i < snake.elements.length; i++) {
        if (snake.elements[0].pozX === snake.elements[i].pozX && snake.elements[0].pozY === snake.elements[i].pozY) {
          clearInterval(this.intervalId);
          snake.elements.shift();
          snake.elements.push(snake.lastElement);
          this.gameEnd = true;
          if (this.soundOn) {
            this.hittingWall.play();
          }
          setTimeout(this.loseRound.bind(this), 1000);
        }
      }

      if (round.currentCountSlots === round.slotsInRound) {
        clearInterval(this.intervalId);
        this.gameEnd = true;
        setTimeout(this.wonRound.bind(this, round.score), 1000);
      }

      this.snakeView.setGameParams(canvasSize, round, food, snake);
    }
    this.intervalId = setInterval(drawGame.bind(this), round.speed);
  }

  loseRound() {
    this.snakeView.showLosePage();
    if (this.soundOn) {
      this.losingRound.play();
      this.backgroundSound.pause();
    }
  }

  continueGame() {
    this.snakeView.continueGame();
    this.startGame();
  }

  wonRound(score) {
    this.snakeView.showWonPage();
    if (this.soundOn) {
      this.backgroundSound.pause();
      this.winningRound.play();
    }

    if (this.user.level < this.user.currentRound) {
      this.user.level = this.user.currentRound;
    }

    if (this.user.currentRound < 6) {
      this.user.currentRound++;
    }

    this.user.score = score;
    localStorage.setItem("snakePlayerData", JSON.stringify(this.user));
    this.updateDataDB();
  }

  setSound() {
    if (this.soundOn === false) { 
      this.soundOn = true;
      this.playSound();
      this.snakeView.setMuteBtnOn();
    } else {
      this.soundOn = false;
      this.stopSound();
      this.snakeView.setMuteBtnOff();
    }
  }

  playSound() {
    if (this.soundOn === true) {
      this.backgroundSound.play();
      this.backgroundSound.volume = 0.6;
      this.backgroundSound.loop = true;
    }

    this.eatingFoodSound.pause();
    this.hittingWall.pause();
    this.losingRound.pause();
    this.winningRound.pause();
  }

  stopSound() {
    this.backgroundSound.pause();
  }

  updateDataDB() {
    snakeGameDB
      .ref("users/" + this.user.id)
      .update({
        level: this.user.level,
        score: this.user.score
      })
      .catch((error) => {
        console.error("Data update error: ", error.message);
      });
  }

  getBestPlayers() {
    this.snakeView.showLoader();

    snakeGameDB
      .ref("users/")
      .once("value")
      .then((snapshot) =>
        this.parseBestPlayersData(snapshot.val()))
      .catch((error) =>
        console.error("Error getting list of players: " + error.message)
      );
  }

  parseBestPlayersData(usersObj) {
    const usersArr = [];
    for (let key in usersObj) {
      const user = {};
      user.name = usersObj[key].username;
      user.score = usersObj[key].score;
      usersArr.push(user);
    }

    function compareScore(a, b) {
      return (b.score - a.score);
    }
    usersArr.sort(compareScore);

    setTimeout(() => this.snakeView.hideLoader(), 500);
    this.snakeView.showBestPlayersTable(usersArr);
  }

  clearData() {
    this.deleteUserFromDB();
    this.clearLocalStorage();
    window.location.hash = "main";
  }

  deleteUserFromDB() {
    snakeGameDB
      .ref("users/" + this.user.id)
      .remove()
      .catch((error) => {
        console.error("Deleting user error: ", error.message);
      });

    firebase
      .auth()
      .currentUser
      .delete()
      .catch((error) => {
        console.error("Deleting user error: ", error.message);
      });
  }

  clearLocalStorage() {
    localStorage.removeItem("snakePlayerData");
    this.updatePage("main");
  }

  askUserBeforeUnload(event) {
    if (window.location.hash === "#game" && !this.gameEnd) {
      event.preventDefault();
      event.returnValue = "";
    }
  }

  askBeforeGoForwardOrBack() {
    if (window.location.hash === "#rounds" && !this.gameEnd) {
      const conf = confirm("You will lose your score!");
      if (conf) {
        clearInterval(this.intervalId);
        this.gameEnd = true;
        this.stopSound();
      } else {
        this.callCommandForwardOrBack = true;
        window.location.hash = "game";
      }
    }
  }
};