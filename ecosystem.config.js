module.exports = {
  apps: [{
    name: 'saltadmin',
    cwd: '/root/saltstayz/saltadmin',
    script: 'npx',
    args: 'serve -s build -p 3006',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
}
