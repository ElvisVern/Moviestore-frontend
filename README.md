## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

- use `Nextjs` and `tailwindcss` and `shadcn/ui` to build the project

- For the sake of brevity, the `fetch` request is used here, but in a real application, we should use a library like `axios` to handle the request and response.

- shoule use `Skeleton` components to show a placeholder while movie list content is loading.

- use `createContext` to store the movie data and `useContext` to get the data in the `MovieDetail` component

- use `React.memo` to optimize the `MovieDetail` component and prevent unnecessary re-renders.

- use `useEffect` to fetch the data from the API and store it in the context

- use `useRouter` to get the current route and pass it to the `MovieDetail` component
