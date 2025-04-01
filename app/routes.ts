import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index('routes/home.tsx'),
  route('maths', 'routes/maths.tsx'),
  route('order', 'routes/order.tsx'),
] satisfies RouteConfig;
