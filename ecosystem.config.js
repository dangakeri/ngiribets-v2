module.exports = {
    apps: [
      {
        name: 'sofabets',
        script: 'node_modules/.bin/next',
        args: 'start',
        instances: 'max',
        exec_mode: 'cluster',
        env: {
          NODE_ENV: 'development',
        },
        env_production: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
  