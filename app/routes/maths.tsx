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
      <div className="nes-container with-title is-centered is-dark">
        <h1 className="title">Math</h1>
        <div className="content-box lists">
          <ul className="nes-list is-disc">
            <li><NavLink to="/order" end>order of operations</NavLink></li>
          </ul>
        </div>
      </div>
    </main>
  );
}
