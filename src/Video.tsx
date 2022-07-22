import {Composition} from 'remotion';
import {ZebraCat} from './ZebraCat';
import config from './input_data/config.json'
export const RemotionVideo: React.FC = () => {
	return (
		<>
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
