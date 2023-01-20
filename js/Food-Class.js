class Food {
  constructor() {
    const foodArray = ["apple", "avocado", "banana", "carrot", "cherry", "cucumber", "eggplant", "orange", "pear", "pepper", "plum", "raspberry", "tomato", "watermelon"];
    this.pozX = Math.floor(Math.random() * 32) * 30;
    this.pozY = Math.floor(Math.random() * 20 + 2) * 30;
    this.foodImg = foodArray[Math.floor(Math.random() * 14)];
  }
}