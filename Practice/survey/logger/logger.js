'use strict';

exports = module.exports = (function() {
    var instance = null;
    var _level = 1;
    var _defaultLevel = 1;

    function LoggerInstance() {
        this.log = function(message, level) {
            level = level || _defaultLevel;

            var levelMessage = ['DEBUG', 'INFO', 'WARN', 'CRITICAL'];
            var consoleMessage = [levelMessage[level] + ':'];

            if (Array.isArray(message)) {
                consoleMessage.push(...message);
            } else {
                consoleMessage.push(message);
            }

            level = (level >= 0 && level <= 3) ?
                    parseInt(level, 10) : _defaultLevel;

            if (level >= _level) {
                if (level < 3) {
                    console.log(...consoleMessage);
                } else {
                    console.error(...consoleMessage);
                }
            }

            return this;
        }

        this.level = function(level) {
            if (level === undefined) {
                return _level;
            }

            if (level >= 0 && level <= 3) {
                _level = level;
            }

            return this;
        }

        this.defaultLevel = function(level) {
            if (level === undefined) {
                return _defaultLevel;
            }

            if (level >= 0 && level <= 3) {
                _defaultLevel = level;
            }

            return this;
        }

        return this;
    }

    function Logger(level) {
        _level = (level && level >= 0 && level <=3) ? level : _level;

        if (instance === null) {
            instance = new LoggerInstance;
        }

        return instance;
    }

    return {
        Logger: Logger,
        levels: {DEBUG: '0',
                INFO: '1',
                WARN: '2',
                CRITICAL: '3'}
    };
})();
