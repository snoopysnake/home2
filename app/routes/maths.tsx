import type { Route } from "./+types/maths";
import { NavLink } from 'react-router';
import { Logo } from "~/logo/logo";
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
      <Logo />
      <h2>maths practice.</h2>
      <ul>
        <li><NavLink to="/order" end>order of operations</NavLink></li>
      </ul>
    </main>
  );
}
