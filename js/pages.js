const AutorizationPage = {
  id: "sign-in",
  title: "Sign in",
  render: (className = "container") => {
    return `
      <section class="${className}">
        <form class="login-form" autocomplete="off">
          <input type="email" id="login-email-input" placeholder="Your e-mail...">
          <span class="error-span" id="login-email-input-span"></span>
          <input type="password" id="login-password-input" minlength="5" maxlength="20" placeholder="Your password...">
          <span class="error-span" id="login-password-input-span"></span>
          <button class="login-btn" id="login-btn">Play</button>
          <span class="error-span" id="login-btn-span"></span>
          <p class="login-par-link">Don't have an account?
            <a class="login-link" href="#" id="signup-link">Sign Up</a>
          </p>
        </form>

        <form class="signup-form form_hidden" autocomplete="off">
          <input type="text" id="signup-name-input" placeholder="Your name..." minlength="2" maxlength="20">
          <span class="error-span" id="signup-name-input-span"></span>
          <input type="email" id="signup-email-input" placeholder="Your e-mail...">
          <span class="error-span" id="signup-email-input-span"></span>
          <input type="password" id="signup-password-input" minlength="5" maxlength="20" placeholder="Your password...">
          <span class="error-span" id="signup-password-input-span"></span>
          <button class="login-btn" id="signup-btn">Sign Up</button>
          <span class="error-span" id="signup-btn-span"></span>
          <p class="login-par-link">I have an account.
            <a class="login-link" href="#" id="login-link">Login</a>
          </p>
        </form>
      </section>
    `;
  }
}

const HomePage = {
  id: "main",
  title: "Snake",
  render: (className = "container", player) => {
    return `
      <section class="${className}">
        <div class="menu-container">
          <div class="menu-block">
            <div class="player-info-name">Hi, ${player.name}!</div>
            <div class="player-info-score">Your score: ${player.score}</div>
          </div>
          <div class="menu-block">
            <a class="menu-btn" href="#rounds">Play</a>
          </div>
          <div class="menu-block">
            <a class="menu-btn" href="#records">Records</a>
          </div>
          <div class="menu-block">
            <a class="menu-btn" href="#rules">Rules</a>
          </div>
          <div class="menu-block">
            <a class="menu-btn" href="#about">About</a>
          </div>
          <div class="menu-block">
            <a class="menu-btn" href="#" id="exit-btn">Exit</a>
          </div>
        </div>
      </section>
    `;
  }
}

const RoundsPage = {
  id: "rounds",
  title: "Snake - rounds",
  render: (className = "container") => {
    return `
      <section class="${className}">
        <div class="level-btn-block">
          <a class="level-btn" href="#game">1</a>
        </div>
        <div class="level-btn-block">
          <a class="level-btn" href="#game">2</a>
        </div>
        <div class="level-btn-block">
          <a class="level-btn" href="#game">3</a>
        </div>
        <div class="level-btn-block">
          <a class="level-btn" href="#game">4</a>
        </div>
        <div class="level-btn-block">
          <a class="level-btn" href="#game">5</a>
        </div>
        <div class="level-btn-block">
          <a class="level-btn" href="#game">6</a>
        </div>
        <div class="level-btn-block">
          <a class="level-btn-back" href="#main">Menu</a>
        </div>
      </section>
    `;
  }
}

const GamePage = {
  id: "game",
  title: "Snake - game",
  render: (className = "container") => {
    return `
      <section class="${className}">
        <div class="canvas-section">
          <button class="mute-btn" id="mute-btn"></button>
          <canvas class="canvas" id="canvas"></canvas>
        </div>
        <div class="roundresult-block roundresult-block_hidden">
          <h1 class="roundresult-title"></h1>
          <div class="roundresult-btn-container">
            <div class="roundresult-btn-block">
              <a class="roundresult-btn-link" href="#main">Menu</a>
            </div>
            <div class="roundresult-btn-block">
              <a class="roundresult-btn-link" href="#" id="continue-btn"></a>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

const RecordsPage = {
  id: "records",
  title: "Snake - records",
  render: (className = "container") => {
    return `
      <section class="${className}">
        <div class="records-block">
          <h2 class="subtitle">Top players</h2>
          <table class="records-table">
            <tbody></tbody>
          </table>
        </div>

        <div class="records-btn-container">
          <div class="records-btn-block">
            <a class="records-btn-link" href="#main">Menu</a>
          </div>
          <div class="records-btn-block">
            <a class="records-btn-link" href="#" id="delete-data-btn">Delete my data</a>
          </div>
        </div>
      </section>
    `;
  }
}

const RulesPage = {
  id: "rules",
  title: "Snake - rules",
  render: (className = "container") => {
    return `
      <section class="${className}">
        <div class="rules-block">
          <h2 class="subtitle">Rules</h2>
          <p class="rules-text">
            In this game you need to move the snake using keys Arrow Up, Arrow Down, Arrow Left, Arrow Right. The goal of the game is to eat 
            fruit and vegetables which appear on the playing field randomly. After snake eats the item, its body grows by one segment. Each 
            round has a certain number of segments that the snake uses to grow. After reaching this number the round will finish. Every 
            next round the speed of snake and the number of segments increase. If the snake clashes the wall or its own body, it will die 
            and scored points will be lost.
          </p>
        </div>

        <div class="rules-btn-block">
          <a class="rules-btn" href="#main">Menu</a>
        </div>
      </section>
    `;
  }
}

const AboutPage = {
  id: "about",
  title: "Snake - about",
  render: (className = "container") => {
    return `
      <section class="${className}">
        <div class="about-block">
          <h2 class="subtitle">About</h2>
          <p class="about-text">
            The project is released as a Single Page Application using JavaScript, HTML, CSS. Graphics is made using Canvas. Database is 
            Firebase. The project code is organized by MVC architectural pattern and ECMAScript 6.
            <br>
            Developer: Andrei Burko
            <br>
            My email: burko.andrei@gmail.com
          </p>
        </div>

        <div class="about-btn-block">
          <a class="about-btn" href="#main">Menu</a>
        </div>
      </section>
    `;
  }
}

const ErrorPage = {
  id: "error",
  title: "Snake - error",
  render: (className = "container") => {
    return `
      <section class="${className}">
        <h2 class="error-title">Error 404: Page not found</h2>
        <div class="error-btn-block">
          <a class="error-btn" href="#main">Menu</a>
        </div>
      </section>
    `;
  }
}