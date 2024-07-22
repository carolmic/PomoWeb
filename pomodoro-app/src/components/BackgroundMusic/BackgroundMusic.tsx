// import { useEffect, useRef, useState } from "react";
// import lofi from "../../assets/summer-rain-lofi.mp3";

// interface BackgroundMusicProps {
// 	play: boolean;
// }

// type File = {
// 	_id: string;
// 	contentType: string;
// 	filename: string;
// 	length: number;
// 	uploadDate: string;
// 	chunkSize: number;
// };

// const BackgroundMusic = ({ play }: BackgroundMusicProps) => {
// 	const [urls, setUrls] = useState<File[]>([]);
// 	const [current, setCurrent] = useState<string>(lofi);

// 	useEffect(() => {
// 		const fetchData = async () => {
// 			try {
// 				const response = await fetch("http://localhost:3000/files");
// 				const data = await response.json();
// 				setUrls(data.files);
// 				console.log("data", data.files);
// 			} catch (error) {
// 				console.error("Error fetching data:", error);
// 			}
// 		};

// 		fetchData();
// 	}, []);

// 	const audioRef = useRef<HTMLAudioElement | null>(null);

// 	useEffect(() => {
// 		if (play) {
// 			audioRef.current?.play();
// 		} else {
// 			audioRef.current?.pause();
// 		}
// 	}, [play]);

// 	useEffect(() => {
// 		if (urls.length > 0) {
// 			if (audioRef.current?.ended) {
// 				setCurrent(urls[Math.floor(Math.random() * urls.length)].filename);
// 			}
// 		}
// 		console.log("current", audioRef.current?.src);
// 	}, [current]);

// 	return (
// 		<>
// 			<audio ref={audioRef}>
// 				<source src={current} type="audio/mpeg" />
// 			</audio>
// 			<button onClick={() => {
// 				if (audioRef.current) {
// 					audioRef.current.currentTime = audioRef.current.duration;
// 				}
// 				setCurrent(urls[0].filename)
// 				console.log("current", current);
// 				audioRef.current?.play();
// 				console.log(audioRef.current)
// 				}}>skip</button>
// 		</>
// 	);
// };

// export default BackgroundMusic;
import { useEffect, useState } from 'react';

const BackgroundMusic = () => {
  const [urls, setUrls] = useState<any[]>([]);
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/files");
        const data = await response.json();
        const shuffledData = shuffleArray(data.files);
        setUrls(shuffledData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const shuffleArray = (array: any[]) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const handlePlay = (fileUrl: string) => {
    setCurrentAudio(fileUrl);
  };

  return (
    <div>
      <div>
        {urls.map((file, index) => (
          <div key={index}>
            <button onClick={() => handlePlay(`http://localhost:3000/files/${file._id}`)}>
              Play {file.filename}
            </button>
          </div>
        ))}
      </div>

      {currentAudio && (
        <audio controls autoPlay>
          <source src={currentAudio} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default BackgroundMusic;
