import type { NextPage } from "next";
import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useSocket } from "../context/sockets.context";
import * as EVENTS from "../config/socketEvents";
import iconPath from "./favicon.svg";

const Home: NextPage = () => {
  const { socket, role, setRole, clientID } = useSocket();
  const [audioPath, setAudioPath] = useState<string>(
    "./AutumnWhatMyOgToldMe.mp3"
  );
  const [audioStatus, setAudioStatus] = useState<string>("paused");
  
  const musicPlayers = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined" ? new Audio("") : undefined
  );
  // @ts-ignore
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (role == "DJ"){
      setAudioPath("");
    }
    if (role == "Audience"){
      setAudioPath("./AutumnWhatMyOgToldMe.mp3");
    }
  }, [role]);

  const handlePlaySound = () => {
    if (role == "DJ") {
      socket.emit(EVENTS.CLIENT_EVENTS.PLAY_SOUND);
    }
  };

  const handlePauseSound = () => {
    if (role == "DJ") {
      socket.emit(EVENTS.CLIENT_EVENTS.PAUSE_SOUND);
      // @ts-ignore 
    }
  };

  socket.on(EVENTS.SERVER_EVENTS.PLAY_SOUND, () => {
    if (role == "Audience") {
      musicPlayers.current?.load();
      musicPlayers.current?.play();
    }
    if (role == "DJ"){
      musicPlayers.current?.load();
    }
  });

  socket.on(EVENTS.SERVER_EVENTS.PAUSE_SOUND, () => {
    if (role == "Audience" && musicPlayers.current !== undefined) {
      musicPlayers.current.oncanplaythrough = () => {
        musicPlayers.current?.pause();
      }
    }
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>{audioStatus}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Soundbot</h1>
      <div>
        <h4>Role: {role}</h4>
        <button onClick={() => setRole("Audience")}>Audience</button>
        <button onClick={() => {

          setRole("DJ")}}>DJ</button>

        { role == "DJ" && (
          <>
            <button onClick={() => handlePlaySound()}>Play Sound</button>
            <button onClick={() => handlePauseSound()}>Pause Sound</button>
          </> )
        }
        <audio ref={audioRef} src={audioPath} />
      </div>
    </div>
  );
};

export default Home;
