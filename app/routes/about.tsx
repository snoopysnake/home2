import type { Route } from "./+types/about";
import { NavLink } from 'react-router';
import { Logo } from "~/logo/logo";
import sprite from '../../image/sprite.png';
import '../maths.css';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Alex Chiang | About" },
    { name: "description", content: "Alex Chiang Website About" },
  ];
}

export default function Home() {
  return (
    <main className="content">
      <Logo />
      <section className="message-box">
        <img className="me" src={sprite} />
        <div className="nes-balloon from-left is-dark">
          <h1>About Me</h1>
        </div>
      </section>
      <div className="nes-container with-title is-centered is-dark mb-40">
        <h1 className="title">Technical Skills</h1>
        <div className="content-box lists">
          <ul className="nes-list is-disc">
            <li>JavaScript</li>
            <li>Angular</li>
            <li>React</li>
          </ul>
        </div>
      </div>
      <div className="nes-container with-title is-centered is-dark mb-40">
        <h1 className="title">Math Worksheets</h1>
        <div className="content-box lists">
          <ul className="nes-list is-disc">
            <li><NavLink to="/order" end>order of operations</NavLink></li>
          </ul>
        </div>
      </div>
    </main>
  );
}
