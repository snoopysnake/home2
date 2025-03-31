import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Alex Chiang" },
    { name: "description", content: "Alex Chiang Website" },
  ];
}

export default function Home() {
  return <Welcome />;
}
