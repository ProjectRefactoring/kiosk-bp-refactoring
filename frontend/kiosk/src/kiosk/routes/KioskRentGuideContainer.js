/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import KioskHeader from "../components/KioskHeader";
import KioskRentGuideSection from "../components/KioskRentGuideSection";

// 오디오
import audioFile from "../assets/KioskRentGuideContainerAudio.mp3";
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

const componentStyles = css`
  animation: ${fadeIn} 1s ease-in;
`;

const KioskRentStyle = css`
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  background-color: #eef1ff;

  footer {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
`;

// 위에는 Emotion.js 입니다.
// 밑에는 JS 입니다.

const KioskRentCompleteContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 오디오
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(new Audio(audioFile));

  const audioPlay = () => {
    if (audio.volume === 0) {
      audio.currentTime = 0;
      audio.volume = 1;
      audio.play();
    } else {
      audio.currentTime = 100;
      audio.volume = 0;
    }
  };

  useEffect(() => {
    audio.volume = 0;
    return () => {
      audio.pause();
    };
  }, [audio.volume]);
  // 오디오

  // 홈화면으로
  const miliUnit = 1000;
  const seconds = 300 * miliUnit;
  useEffect(() => {
    let myTimer = setTimeout(() => {
      navigate(`/kiosk/${id}`);
    }, seconds);
    return () => {
      clearTimeout(myTimer);
    };
  }, [id, seconds, miliUnit, navigate]);

  return (
    <div /*css={componentStyles}*/>
      <div css={KioskRentStyle}>
        <header>
          <KioskHeader />
        </header>
        <section>
          <KioskRentGuideSection />
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

export default KioskRentCompleteContainer;
