# client-logic package

The `client-logic` package contains screens logic used by both `web` and `native` apps. Shared app behavior should be contained within `client-logic` hooks.
Platform-specific code should be abstacted away, e.g `onSuccess?: (secret: string) => void;`.
