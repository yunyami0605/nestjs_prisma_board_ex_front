import { NextPageContext } from "next";
import { Inter } from "next/font/google";
import Router from "next/router";

export default function Home() {
  return <div></div>;
}

Home.getInitialProps = ({ res }: NextPageContext) => {
  if (res) {
    res.writeHead(302, {
      Location: "/posts",
    });
    res.end();
  } else {
    Router.push("/posts");
  }
  return {};
};
