import React from "react";
import { Header } from "../Header/Header";
import '../Main/MainStyle.scss'
import { Outlet } from 'react-router-dom'


export function MainPage() {
  return (
    <>
    <Header/>
    <div className="MainContainer">
        <section className="TaskContainer">
        <Outlet/>
        </section>
    </div>
    </>

  );
}
