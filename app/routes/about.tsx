import type { Route } from "./+types/about";
import { useState, useEffect } from "react";
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
  const [heading, setHeading] = useState(``);
  const [intro, setIntro] = useState(``);
  const [skillsHeading, setSkillsHeading] = useState(``);
  const [skillsArr, setSkillsArr] = useState(['']);
  const [skillsIndex, setSkillsIndex] = useState(0);

  const headingText = `About Me`;
  const introText = `I'm a software engineer with over 5 years of experience in full-stack development. I specialize in modern front-end frameworks and building responsive, user-focused web applications.`;
  const skillsText = `Technical Skills`;
  const skillsArrText = [
    'JavaScript',
    'Angular',
    'React',
    'Node.js',
    'Python',
    'Java',
    'Git',
    'Docker',
    'CodeDeploy',
    'Jenkins'
  ];

  useEffect(() => {
    if (heading.length < headingText.length) {
      const timeout = setTimeout(() => setHeading(headingText.slice(0, heading.length + 1)), 50);
      return () => clearTimeout(timeout);
    }
  }, [heading]);

  useEffect(() => {
    if (heading === headingText && intro.length < introText.length) {
      const delay = intro.length === 0 ? 100 : 25;
      const timeout = setTimeout(() => setIntro(introText.slice(0, intro.length + 1)), delay);
      return () => clearTimeout(timeout);
    }
  }, [heading, intro]);

  useEffect(() => {
    if (intro === introText) {
      const timeout = setTimeout(() => setSkillsHeading(skillsText.slice(0, skillsHeading.length + 1)), 25);
      return () => clearTimeout(timeout);
    }
  }, [intro, skillsHeading]);

  useEffect(() => {
    if (skillsHeading === skillsText && skillsIndex < skillsArrText.length) {
      const arr = [...skillsArr]; // new array
      arr[skillsIndex] = skillsArrText[skillsIndex].slice(0, skillsArr[skillsIndex].length + 1);
      const timeout = setTimeout(() => setSkillsArr(arr), 25);
      if (skillsArr[skillsIndex] === skillsArrText[skillsIndex]) {
        if (skillsIndex + 1 < skillsArrText.length)
          setSkillsArr([...skillsArr, '']);
        setSkillsIndex(skillsIndex + 1);
      }
      return () => clearTimeout(timeout);
    }
  }, [skillsHeading, skillsArr, skillsIndex]);

  return (
    <main className="content">
      <Logo />
      <section className="message-box">
        <img className="me" src={sprite} />
        <div className="nes-balloon full-width custom-balloon from-left is-dark">
          <h1>{heading}</h1>
          <p>{intro}</p>
        </div>
      </section>
      {
        intro === introText &&
        <div className="nes-container skills-container with-title is-centered is-dark mb">
          <h2 className="title">{skillsHeading}</h2>
          <div className="content-box lists">
            <h3>Front End</h3>
            <ul className="nes-list is-disc">
              {
                skillsHeading === skillsText &&
                skillsArr.slice(0,3).map(skill => <li key={skill}>{skill}</li>)
              }
            </ul>
            <h3>Back End</h3>
            <ul className="nes-list is-disc">
              {
                skillsHeading === skillsText &&
                skillsArr.slice(3,6).map(skill => <li key={skill}>{skill}</li>)
              }
            </ul>
            <h3>Dev Ops</h3>
            <ul className="nes-list is-disc">
              {
                skillsHeading === skillsText &&
                skillsArr.slice(6,10).map(skill => <li key={skill}>{skill}</li>)
              }
            </ul>
          </div>
        </div>
      }
      <div className="nes-container with-title is-centered is-dark">
        <h2 className="title">Math Worksheets</h2>
        <div className="content-box lists">
          <ul className="nes-list is-disc">
            <li><NavLink to="/order" end>order of operations</NavLink></li>
          </ul>
        </div>
      </div>
    </main>
  );
}
