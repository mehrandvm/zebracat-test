import {Composition} from 'remotion';
import {ZebraCat} from './ZebraCat';
import config from './input_data/config.json';
export const RemotionVideo: React.FC = () => {
	return (
		<>
			<link rel="preconnect" href="https://fonts.googleapis.com" />
			<link
				crossOrigin="true"
				rel="preconnect"
				href="https://fonts.gstatic.com"
			/>
			<link
				href="https://fonts.googleapis.com/css2?family=Lato&family=Raleway&family=Roboto+Condensed&display=swap"
				rel="stylesheet"
			/>
			<Composition
				id="ZebraCat"
				component={ZebraCat}
				durationInFrames={30 * 30}
				fps={30}
				width={406}
				height={720}
				defaultProps={{...config}}
			/>
		</>
	);
};
