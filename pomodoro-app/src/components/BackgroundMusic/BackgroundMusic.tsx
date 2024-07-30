import { useRef } from 'react';
import lofi from '../../assets/summer-rain-lofi.mp3';

interface BackgroundMusicProps {
	play: boolean;
}

const BackgroundMusic = ({ play }: BackgroundMusicProps ) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

	if (play && audioRef.current) {
		audioRef?.current?.play();
	} else {
		audioRef?.current?.pause();
	}

  return (
		<audio ref={audioRef} src={lofi} loop />
  );
};

export default BackgroundMusic;
