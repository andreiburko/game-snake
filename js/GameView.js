class GameView {
  constructor(container, routes, components) {
    this.snakeContainer = container;
    this.routesObj = routes;
    this.componentsObj = components;
    this.contentContainer = null;
    this.loaderContainer = null;
    this.logoGame = null;
    this.canvasSize = null;
    this.roundInfo = null;
    this.foodObj = null;
    this.snakeObj = null;
    this.canvasSettings = {
      canvas: null,
      ctx: null,
      bufferCanvas: null,
      bufferCtx: null,
    };
  }

  renderComponents() {
    const componentsList = Object.keys(this.componentsObj);
    for (let item of componentsList) {
      this.snakeContainer.innerHTML += this.componentsObj[item].render();
    }
    this.contentContainer = this.snakeContainer.querySelector("#content");
    this.loaderContainer = this.snakeContainer.querySelector(".loading-container");
    this.logoGame = this.snakeContainer.querySelector(".logo-game");
  }

  createPage(pageName, player) {
    window.document.title = this.routesObj[pageName].title;
    this.contentContainer.innerHTML = this.routesObj[pageName].render(`${pageName}-page`, player);
    if (this.logoGame.classList.contains("logo-game_hidden")) {
      this.logoGame.classList.remove("logo-game_hidden");
    }
    this.hideLoader();
  }

  showLoader() {
    if (!this.contentContainer.classList.contains("content_hidden")) {
      this.contentContainer.classList.add("content_hidden");
    }
    if (this.loaderContainer.classList.contains("loading-container_hidden")) {
      this.loaderContainer.classList.remove("loading-container_hidden");
    }
  }

  hideLoader() {
    if (!this.loaderContainer.classList.contains("loading-container_hidden")) {
      this.loaderContainer.classList.add("loading-container_hidden");
    }
    if (this.contentContainer.classList.contains("content_hidden")) {
      this.contentContainer.classList.remove("content_hidden");
    }
  }

  showSiginUpForm() {
    const loginForm = this.snakeContainer.querySelector(".login-form");
    const signupForm = this.snakeContainer.querySelector(".signup-form");
    loginForm.classList.add("form_hidden");
    signupForm.classList.remove("form_hidden");
  }

  showLoginForm() {
    const loginForm = this.snakeContainer.querySelector(".login-form");
    const signupForm = this.snakeContainer.querySelector(".signup-form");
    loginForm.classList.remove("form_hidden");
    signupForm.classList.add("form_hidden");
  }

  showError(id, text) {
    const errorSpan = this.contentContainer.querySelector(`#${id}-span`);
    errorSpan.textContent = text;
  }

  updateLevelBtns(level) {
    const levelBtns = this.contentContainer.querySelectorAll(".level-btn");
    for (let i = level + 1; i < levelBtns.length; i++) {
      levelBtns[i].removeAttribute("href");
      levelBtns[i].classList.add("level-btn_disabled");
    }
  }

  setGameParams(canvasSize, roundInfo, foodObj, snakeObj) {
    this.canvasSize = canvasSize;
    this.roundInfo = roundInfo;
    this.foodObj = foodObj;
    this.snakeObj = snakeObj;
  }

  createCanvas() {
    this.logoGame.classList.add("logo-game_hidden");

    // collect canvas data
    this.canvasSettings.canvas = this.contentContainer.querySelector("#canvas");
    this.canvasSettings.canvas.setAttribute("width", this.canvasSize.width);
    this.canvasSettings.canvas.setAttribute("height", this.canvasSize.height);
    this.canvasSettings.ctx = this.canvasSettings.canvas.getContext("2d");

    // create buffer canvas
    this.canvasSettings.bufferCanvas = document.createElement("canvas");
    this.canvasSettings.bufferCtx = this.canvasSettings.bufferCanvas.getContext("2d");
    this.canvasSettings.bufferCtx.canvas.width = this.canvasSettings.ctx.canvas.width;
    this.canvasSettings.bufferCtx.canvas.height = this.canvasSettings.ctx.canvas.height;
  }

  drawField() {
    this.canvasSettings.bufferCtx.fillStyle = "rgba(154,74,45,0.8)";
    this.canvasSettings.bufferCtx.fillRect(0, this.canvasSize.headerHeight, this.canvasSize.width, this.canvasSize.height);
  }

  drawLines() {
    for (let i = 30; i < this.canvasSize.width; i += 30) {
      for (let j = this.canvasSize.headerHeight; j < this.canvasSize.height; j += 30) {
        this.canvasSettings.bufferCtx.beginPath();
        this.canvasSettings.bufferCtx.strokeStyle = "yellow";
        this.canvasSettings.bufferCtx.lineWidth = 0.01;
        this.canvasSettings.bufferCtx.moveTo(0, j);
        this.canvasSettings.bufferCtx.lineTo(this.canvasSize.width, j);
        this.canvasSettings.bufferCtx.moveTo(i, this.canvasSize.headerHeight);
        this.canvasSettings.bufferCtx.lineTo(i, this.canvasSize.height);
        this.canvasSettings.bufferCtx.stroke();
      }
    }
  }

  drawBorder() {
    this.canvasSettings.bufferCtx.beginPath();
    this.canvasSettings.bufferCtx.strokeStyle = "black";
    this.canvasSettings.bufferCtx.lineWidth = 1;
    this.canvasSettings.bufferCtx.moveTo(0, this.canvasSize.headerHeight);
    this.canvasSettings.bufferCtx.lineTo(this.canvasSize.width, this.canvasSize.headerHeight);
    this.canvasSettings.bufferCtx.moveTo(0, this.canvasSize.height-1);
    this.canvasSettings.bufferCtx.lineTo(this.canvasSize.width, this.canvasSize.height-1);
    this.canvasSettings.bufferCtx.moveTo(1, this.canvasSize.headerHeight);
    this.canvasSettings.bufferCtx.lineTo(1, this.canvasSize.height);
    this.canvasSettings.bufferCtx.moveTo(this.canvasSize.width-1, this.canvasSize.headerHeight);
    this.canvasSettings.bufferCtx.lineTo(this.canvasSize.width-1, this.canvasSize.height);
    this.canvasSettings.bufferCtx.stroke();
  }

  drawText() {
    this.canvasSettings.bufferCtx.font = "600 40px Helvetica";
    this.canvasSettings.bufferCtx.fillStyle = "#FCAE1E";
    this.canvasSettings.bufferCtx.fillText(`Score: ${this.roundInfo.score}`, 30, 45);
    this.canvasSettings.bufferCtx.strokeText(`Score: ${this.roundInfo.score}`, 30, 45);
    this.canvasSettings.bufferCtx.fillText(`Slots: ${this.roundInfo.currentCountSlots} / ${this.roundInfo.slotsInRound}`, 375, 45);
    this.canvasSettings.bufferCtx.strokeText(`Slots: ${this.roundInfo.currentCountSlots} / ${this.roundInfo.slotsInRound}`, 375, 45);
  }

  drawFood() {
    const foodImg = new Image();
    foodImg.src = `images/food/${this.foodObj.foodImg}.png`;
    this.canvasSettings.bufferCtx.drawImage(foodImg, this.foodObj.pozX-1, this.foodObj.pozY-1);
  }

  drawSnake() {
    // head
    const snakeHeadImg = new Image();
    snakeHeadImg.src = `images/snake-head.png`;
    if (this.snakeObj.elements[0].radians === null) {
      this.canvasSettings.bufferCtx.drawImage(snakeHeadImg, this.snakeObj.elements[0].pozX, this.snakeObj.elements[0].pozY);
    } else {
      this.canvasSettings.bufferCtx.save();
      this.canvasSettings.bufferCtx.translate(this.snakeObj.elements[0].pozX, this.snakeObj.elements[0].pozY);
      this.canvasSettings.bufferCtx.translate(this.canvasSize.cell/2, this.canvasSize.cell/2);
      this.canvasSettings.bufferCtx.rotate(this.snakeObj.elements[0].radians);
      this.canvasSettings.bufferCtx.drawImage(snakeHeadImg, -this.canvasSize.cell/2, -this.canvasSize.cell/2);
      this.canvasSettings.bufferCtx.restore();
    }

    // body
    for (let i = 1; i < this.snakeObj.elements.length; i++) {
      const snakeBodyImg = new Image();
      snakeBodyImg.src = `images/snake-body.png`;
      this.canvasSettings.bufferCtx.drawImage(snakeBodyImg, this.snakeObj.elements[i].pozX, this.snakeObj.elements[i].pozY);
    }
  }

  drawGame() {
    this.drawField();
    this.drawLines();
    this.drawBorder();
    this.drawText();
    this.drawFood();
    this.drawSnake();
    this.canvasSettings.ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
    this.canvasSettings.ctx.drawImage(this.canvasSettings.bufferCanvas, 0, 0, this.canvasSettings.canvas.width, this.canvasSettings.canvas.height);
    this.canvasSettings.bufferCtx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
    requestAnimationFrame(this.drawGame.bind(this));
  }

  showLosePage() {
    const canvasContainer = this.contentContainer.querySelector(".canvas-section");
    canvasContainer.classList.add("canvas-section_hidden");
    const roundResultContainer = this.contentContainer.querySelector(".roundresult-block");
    roundResultContainer.classList.remove("roundresult-block_hidden");
    roundResultContainer.classList.add("roundresult-block_lose");
    const roundResultTitle = roundResultContainer.querySelector(".roundresult-title");
    roundResultTitle.textContent = "YOU LOSE!";
    const continueBtn = roundResultContainer.querySelector("#continue-btn");
    continueBtn.textContent = "Repeat";
  }

  continueGame() {
    const canvasContainer = this.contentContainer.querySelector(".canvas-section");
    canvasContainer.classList.remove("canvas-section_hidden");
    const roundResultContainer = this.contentContainer.querySelector(".roundresult-block");
    roundResultContainer.classList.add("roundresult-block_hidden");
    if (roundResultContainer.classList.contains("roundresult-block_lose")) {
      roundResultContainer.classList.remove("roundresult-block_lose");
    } else if (roundResultContainer.classList.contains("roundresult-block_won")) {
      roundResultContainer.classList.remove("roundresult-block_won");
    }
  }

  showWonPage() {
    const canvasContainer = this.contentContainer.querySelector(".canvas-section");
    canvasContainer.classList.add("canvas-section_hidden");
    const roundResultContainer = this.contentContainer.querySelector(".roundresult-block");
    roundResultContainer.classList.remove("roundresult-block_hidden");
    roundResultContainer.classList.add("roundresult-block_won");
    const roundResultTitle = roundResultContainer.querySelector(".roundresult-title");
    roundResultTitle.textContent = "YOU WON!";
    const continueBtn = roundResultContainer.querySelector("#continue-btn");
    continueBtn.textContent = "Сontinue";
  }

  setMuteBtnOn() {
    const soundBtn = this.contentContainer.querySelector("#mute-btn");
    soundBtn.classList.add("menu-btn_on");
  }

  setMuteBtnOff() {
    const soundBtn = this.contentContainer.querySelector("#mute-btn");
    soundBtn.classList.remove("menu-btn_on");
  }

  showBestPlayersTable(playersArr) {
    const recordsTable = this.snakeContainer.querySelector("tbody");
    recordsTable.innerHTML = "";
    for (let i = 0; (i < playersArr.length && i < 5); i++) {
      const tr = document.createElement("tr");
      tr.className = "records-table-tr";
      const tdNumber = document.createElement("td");
      tdNumber.className = "records-table-number";
      tdNumber.textContent = i + 1;
      tr.append(tdNumber);
      const tdName = document.createElement("td");
      tdName.className = "records-table-name";
      tdName.textContent = playersArr[i].name;
      tr.append(tdName);
      const tdScore = document.createElement("td");
      tdScore.className = "records-table-score";
      tdScore.textContent = playersArr[i].score;
      tr.append(tdScore);
      recordsTable.append(tr);
    }
  }
};