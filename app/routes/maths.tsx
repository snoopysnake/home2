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
    <main className="content">
      <h1><NavLink to="/" end>ALEX CHIANG</NavLink></h1>
      <h2>maths practice.</h2>
      <ul>
        <li><NavLink to="/order" end>order of operations</NavLink></li>
      </ul>
    </main>
  );
}
