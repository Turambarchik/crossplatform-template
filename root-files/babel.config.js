module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'inline-import',
      {
        extensions: ['.md', '.txt'],
      },
    ],
    'module:react-native-dotenv',
    [
      'react-native-reanimated/plugin',
      {
        globals: ['__scanCodes'],
      },
    ],
    [
      'module-resolver',
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.android.js', '.android.tsx', '.ios.js', '.ios.tsx'],
        root: ['./'],
      },
    ],
  ],
};

/// OR //
// eslint-disable-next-line @typescript-eslint/no-var-requires
const APP_ALIASES = require("./core-structure.config");

const alias = APP_ALIASES.reduce((acc, curr) => {
  acc[curr] = `./src/${curr}`;

  return acc;
}, {});

module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        alias,
      },
    ],
    "react-native-reanimated/plugin",
  ],
};

