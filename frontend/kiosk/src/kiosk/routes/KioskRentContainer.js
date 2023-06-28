/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import KioskHeader from "../components/KioskHeader";
import KioskRentSection from "../components/KioskRentSection";

// 오디오
import audioFile from "../assets/KioskRentContainerAudio.mp3";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

const AudioPlayStyle = css`
  width: 4rem;
  height: 4rem;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #b1b2ff;

  position: absolute;
  bottom: 1rem;
  right: 1rem;

  border-radius: 50%;
`;
// 오디오

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeInStyles = css`
  animation: ${fadeIn} 1s ease-in;
`;

const KioskRentStyle = css`
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  background-color: #eef1ff;
`;

// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.

const KioskRentContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 오디오
  const audioRef = useRef(new Audio(audioFile));

  const audioPlay = useCallback(() => {
    const audio = audioRef.current;
    if (audio.volume === 0) {
      audio.currentTime = 0;
      audio.volume = 1;
      audio.play();
    } else {
      audio.currentTime = 100;
      audio.volume = 0;
    }
  }, []);

  const audio = useMemo(() => audioRef.current, []);

  useEffect(() => {
    audio.volume = 1;
    audio.play();
    return () => {
      audio.pause();
    };
  }, [audio]);

  // 홈화면으로
  const miliUnit = 1000;
  const seconds = 3000 * miliUnit;
  useEffect(() => {
    const myTimer = setTimeout(() => {
      navigate(`/kiosk/${id}`);
    }, seconds);
    return () => {
      clearTimeout(myTimer);
    };
  }, [id, navigate]);

  return (
    <div css={fadeInStyles}>
      <div css={KioskRentStyle}>
        <header>
          <KioskHeader />
        </header>
        <section>
          <KioskRentSection />
        </section>
        {/* 오디오 */}
        <div css={AudioPlayStyle} id="audioplay" onClick={audioPlay}>
          <VolumeUpIcon fontSize="large" />
        </div>
        {/* 오디오 */}
      </div>
    </div>
  );
};

export default KioskRentContainer;
