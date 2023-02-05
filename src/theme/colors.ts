const colors = new (class {
  white = "#FFFFFF";
  black = "#000000";

  darkerYellow = "#FAD02C";
  darkYellow = "#FCE181";
  lightYellow = "#FEF9C7";

  darkGreen = "#026670";
  lightGreen = "#00887A";

  darkerGrey = "#404040";
  darkGrey = "#757575";
  lightGrey = "#EDEAE5";

  error = "#d32f2f";
  success = "#5eca4b";

  // self defined
  primary = this.lightGreen;
  secondary = this.darkYellow;
  font = this.darkGrey;
  timetableBorder = this.darkGrey;
})();

export default colors;
