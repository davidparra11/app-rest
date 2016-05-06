module.exports = {
    "env": {
        "node": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "quotes": [
            "warn",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "max-len": [2, 80],
        "indent": [1, 2, {"SwitchCase": 1}],
        "no-undefined": [0]
    }
};

