export default ({ config }) => {
  const runtimeTarget = process.env.DEVELOPMENT ? "expoGo" : "build";
  const runtimeVersion = config.extra[runtimeTarget].runtimeVersion;

  return {
    ...config,
    runtimeVersion,
  };
};
