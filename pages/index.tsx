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

  // @ts-ignore
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlaySound = () => {
    if (role == "DJ") {
      socket.emit(EVENTS.CLIENT_EVENTS.PLAY_SOUND, {
        name: "Test Sound",
        path: audioPath,
      });
    }
  };

  const handlePauseSound = () => {
    if (role == "DJ") {
      socket.emit(EVENTS.CLIENT_EVENTS.PAUSE_SOUND, {
        name: "Test Sound",
        path: audioPath,
      });
      // @ts-ignore
      audioRef.current.muted = true;
    }
  };

  socket.on(EVENTS.SERVER_EVENTS.PLAY_SOUND, () => {
    if (role == "Audience") {
      console.log("We should be playing a sound now!");

      // @ts-ignore
      audioRef.current.oncanplaythrough = () => {
        // @ts-ignore
        audioRef.current.play();
        setAudioStatus("playing");
      }

      //@ts-ignore
      audioRef.current.src = audioPath;
      //@ts-ignore
      audioRef.current.load();
    }
    if (role == "DJ"){
      console.log("We shouldn't play anything right now!");
      // @ts-ignore
      audioRef.current.pause();
    }
  });

  socket.on(EVENTS.SERVER_EVENTS.PAUSE_SOUND, () => {
    if (role == "Audience") {
      console.log("We should be pausing a sound now!");
      //@ts-ignore
      audioRef.current.pause();
      setAudioStatus("paused");
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
        <button onClick={() => setRole("DJ")}>DJ</button>

        { role == "DJ" && (
          <>
            <button onClick={() => handlePlaySound()}>Play Sound</button>
            <button onClick={() => handlePauseSound()}>Pause Sound</button>
          </> )
        }
      </div>

      <audio id="audioPlayer" ref={audioRef}></audio>
    </div>
  );
};

export default Home;
