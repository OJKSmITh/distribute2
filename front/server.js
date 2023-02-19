const express = require("express")
const app = require("./app")
const config = require("./config")
const port = config.port

app.listen(port, async () => {
  console.log(`front server open ${port}`);
})
