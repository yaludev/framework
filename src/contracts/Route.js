const express = require("express");

class Route {
  constructor(app) {
    this.app = app;
    console.log("route initialized");
  }
  _loadRoutes = () => {
    
  }
  driver = () => {
    return express();
  };
}
module.exports = Route;
