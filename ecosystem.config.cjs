module.exports = {
  apps: [
    {
      name: "goodroom",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3002 -H 0.0.0.0",
      cwd: __dirname,
      instances: 1,
      autorestart: true,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: "3002",
        HOSTNAME: "0.0.0.0",
        ENFORCE_HTTPS: "true",
        NEXT_PUBLIC_SITE_URL: "https://goodroom26.ru",
      },
    },
  ],
};
