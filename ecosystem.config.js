module.exports = {
    apps: [
        {
            name: 'ui',
            exec_mode: 'cluster',
            instances: 1, // Or a number of instances
            script: 'npm',
            args: 'dev',
            env: {
                PORT: '3010',
            }
        }
    ]
}
