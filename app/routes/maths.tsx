import type { Route } from "./+types/maths";
import { MathStuff } from "../maths/math-stuff.tsx";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Alex Chiang | Maths" },
    { name: "description", content: "Alex Chiang Website Maths" },
  ];
}

export default function Home() {
  return (
    <main>
      <MathStuff />
    </main>
  );
}
