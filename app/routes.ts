import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index('routes/home.tsx'),
  route('about', 'routes/about.tsx'),
  route('order', 'routes/order.tsx'),
] satisfies RouteConfig;
