export const hexToFloat = (hexString: string) => {
  const hexParts = hexString.split(".");

  const decimalValue =
    parseInt(hexParts[0], 16) +
    (hexParts[1] ? parseInt(hexParts[1], 16) / 16 ** hexParts[1].length : 0);

  return decimalValue;
};
