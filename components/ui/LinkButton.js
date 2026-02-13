import React from 'react'

const LinkButton = ({ link, text, color }) => {
    const getColor = () => {
      const def = { bg: ``, text: ``, shadow: "" };
      switch (color) {
        case "emerald":
          return {
            bg: `bg-emerald-500`,
            text: `text-emerald-400`,
            border: `border-emerald-400`,
            shadow: "shadow-emerald-400",
          };
        case "sky":
          return {
            bg: `bg-sky-500`,
            text: `text-sky-400`,
            border: `border-sky-400`,
            shadow: "shadow-sky-500",
          };
        case "purple":
          return {
            bg: `bg-purple-500`,
            text: `text-purple-400`,
            border: `border-purple-400`,
            shadow: "pink-shadow",
          };
        case "pink":
          return {
            bg: `bg-pink-500`,
            text: `text-pink-400`,
            border: `border-pink-400`,
            shadow: "pink-shadow",
          };
        case "teal":
          return {
            bg: `bg-teal-500`,
            text: `text-teal-400`,
            border: `border-teal-400`,
            shadow: "blue-shadow",
          };
        case "amber":
          return {
            bg: `bg-amber-500`,
            text: `text-amber-400`,
            border: `border-amber-400`,
            shadow: "orange-shadow",
          };
        case "fuchsia":
          return {
            bg: `bg-fuchsia-500`,
            text: `text-fuchsia-400`,
            border: `border-fuchsia-400`,
            shadow: "pink-shadow",
          };
        case "rose":
          return {
            bg: `bg-rose-500`,
            text: `text-rose-400`,
            border: `border-rose-400`,
            shadow: "pink-shadow",
          };
        case "violet":
          return {
            bg: `bg-violet-500`,
            text: `text-violet-400`,
            border: `border-violet-400`,
            shadow: "purple-shadow",
          };
        case "indigo":
          return {
            bg: `bg-indigo-500`,
            text: `text-indigo-400`,
            border: `border-indigo-400`,
            shadow: "purple-shadow",
          };
        case "cyan":
          return {
            bg: `bg-cyan-500`,
            text: `text-cyan-400`,
            border: `border-cyan-400`,
            shadow: "blue-shadow",
          };
        case "red":
          return {
            bg: `bg-red-500`,
            text: `text-red-400`,
            border: `border-red-400`,
            shadow: "pink-shadow",
          };
        case "rose":
          return {
            bg: `bg-rose-500`,
            text: `text-rose-500`,
            border: `border-rose-400`,
            shadow: "pink-shadow",
          };
        case "yellow":
          return {
            bg: `bg-yellow-500`,
            text: `text-yellow-500`,
            border: `border-yellow-500`,
            shadow: "orange-shadow",
          };
        case "orange":
          return {
            bg: `bg-orange-500`,
            text: `text-orange-400`,
            border: `border-orange-400`,
            shadow: "shadow-orange-400",
          };
        case "lime":
          return {
            bg: `bg-lime-500`,
            text: `text-lime-400`,
            border: `border-lime-400`,
            shadow: "green-shadow",
          };
        default:
          return def;
      }
    };
  
    return (
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className={`w-full justify-center items-center text-center text-xl px-2 border-2 rounded-lg font-bold ${
          getColor().border
        } ${getColor().text} ${`hover:${getColor().bg} hover:text-white`} transition duration-200 ease-out hover:shadow-lg`}
      >
        {text}
      </a>
    );
  };

export default LinkButton