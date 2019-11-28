module.exports = {
    appenders: [
        {
            type: 'console'
        },
        {
            type: 'dateFile',
            category: 'data',
            filename: 'logs/data/data',
            pattern: '-yyyy-MM-dd--hh.log',
            alwaysIncludePattern: true
        },
        {
            type: 'dateFile',
            category: 'system',
            filename: 'logs/system/system',
            pattern: '-yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            backups:45
        },
        {
            type: 'dateFile',
            category: 'access',
            filename: 'logs/access/access',
            pattern: '-yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            backups:45
        },
        {
            type: 'dateFile',
            category: 'schedule',
            filename: 'logs/schedule/run',
            pattern: '-yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            backups:45
        },
        {
            type: 'dateFile',
            category: 'rerunSchedule',
            filename: 'logs/schedule/rerun',
            pattern: '-yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            backups:45
        },
        {
            type: 'dateFile',
            category: 'database',
            filename: 'logs/database/database',
            pattern: '-yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            backups:45
        },
        {
            type: 'logLevelFilter',
            level: 'ERROR',
            appender: {
                type: 'dateFile',
                filename: 'logs/errors/error',
                pattern: '-yyyy-MM-dd.log',
                alwaysIncludePattern: true,
                backups:45
            }
        }
    ],
    replaceConsole: true
};