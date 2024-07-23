import { useEffect, useRef, useState } from "react";

interface BackgroundMusicProps {
	play: boolean;
}

const BackgroundMusic = ({ play }: BackgroundMusicProps) => {
	const [files, setFiles] = useState<any[]>([]);
	const [currentAudio, setCurrentAudio] = useState<string>("");
	const baseUrl = "https://pomodoro-api.eba-psvtrnjk.us-east-2.elasticbeanstalk.com/download/";

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("https://pomodoro-api.eba-psvtrnjk.us-east-2.elasticbeanstalk.com/files");
				const data = await response.json();
				const filesWithUrls = data.files.map((file: any) => ({
					...file,
					url: `${baseUrl}${file.filename}`,
				}));
				setFiles(filesWithUrls);
				setCurrentAudio(filesWithUrls[1].url);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	const audioRef = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		if (play) {
			audioRef.current?.play();
		} else {
			audioRef.current?.pause();
		}
	}, [play]);

	const handleSkip = () => {
		setCurrentAudio(files.sort(() => Math.random() - 0.5)[0].url);
	};

	useEffect(() => {
		let interval = setInterval(() => {
			if (audioRef.current?.ended) {
				handleSkip();
				if (currentAudio) {
					audioRef.current?.load();
					audioRef.current?.play();
				}
			}		
			interval;
		}, 1000);
	}, [currentAudio]);

	return (
		<>
			{currentAudio && (
				<>
					<audio ref={audioRef} autoPlay>
						<source src={currentAudio} type="audio/mpeg" />
					</audio>
				</>
			)}
		</>
	);
};

export default BackgroundMusic;
