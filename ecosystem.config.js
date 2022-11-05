module.exports = {
    apps: [
        {
            name: 'frontend',
            exec_mode: 'cluster',
            instances: 1, // Or a number of instances
            script: 'npm',
            args: 'start',
            env: {
                PORT: '3010',
            }
        }
    ]
}
