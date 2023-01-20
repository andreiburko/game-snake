const LogoGame = {
  render: () => {
    return `
      <h1 class="logo-game">SNAKE</h1>
    `;
  }
}

const Loader = {
  render: () => {
    return `
      <div class="loading-container">
        <div class="loading-tomato"></div>
        <div class="loading-banana"></div>
        <div class="loading-pepper"></div>
        <div class="loading-raspberry"></div>
        <div class="loading-eggplant"></div>
        <div class="loading-pear"></div>
      </div>
    `;
  }
}

const Content = {
  render: () => {
    return `
      <div class="content" id="content"></div>
    `;
  }
};