import type { Route } from "./+types/maths";
import { NavLink } from 'react-router';
import '../maths.css';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Alex Chiang | Maths" },
    { name: "description", content: "Alex Chiang Website Maths" },
  ];
}

export default function Home() {
  return (
    <main>
      <h1>alex chiang math stuff.</h1>
      <ul>
        <li><NavLink to="/order" end>order of operations practice</NavLink></li>
      </ul>
    </main>
  );
}
