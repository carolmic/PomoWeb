import ReactPlayer from "react-player";

interface BackgroundMusicProps {
	play: boolean;
}

const BackgroundMusic = ({ play }: BackgroundMusicProps) => {
	return (
		<>
			<ReactPlayer
				url="https://www.youtube.com/watch?v=ItMqnBjGtoY&t=6376s"
				playing={play}
				controls={false}
				style={{ display: "none" }}
			/>
		</>
	);
};

export default BackgroundMusic;
