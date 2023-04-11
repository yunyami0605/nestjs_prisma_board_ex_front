const theme = {
  colors: {
    gray: {
      0: "#000",
      2: "#747474",
      3: "#c6c6c6",
      4: "#f4f4f4",
      5: "#fff",
    },
    sky: {
      1: "#E0DFFE",
      2: "#DAD3FF",
      3: "#B6AAFF",
    },
    red: {
      3: "#FF0000",
    },
  },
} as const;

const { colors } = theme;

export { colors, theme };
