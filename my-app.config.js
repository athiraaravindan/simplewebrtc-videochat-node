module.exports = {
  apps: [
    {
      name: "one2one_node",
      script: "./bin/www",
      env: {
        "NODE_ENV": "production"
      }
    },
    {
      name: "signaling-server",
      script: "./signalmaster/server.js",
      env: {
        "NODE_ENV": "production"
      }
    }
  ]
};
