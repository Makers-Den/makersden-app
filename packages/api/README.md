# api package

The `api` package contains backend logic and [trpc](https://trpc.io/) routers. Whole application logic should be stored inside `modules` directory.
This way modules can be also outside [trpc](https://trpc.io/) context, for example in next.js API routes