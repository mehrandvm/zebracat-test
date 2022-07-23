import {
	AbsoluteFill,
	Img,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

import logo from '../input_data/logo_zebra.png';

export const Logo: React.FC = () => {
	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();

	const scale = spring({
		frame,
		config: {
			mass: 0.5,
		},
		fps: videoConfig.fps,
	});

	return (
		<AbsoluteFill
			style={{
				transform: `scale(${scale})`,
			}}
		>
			<Img height={40} width={40} src={logo} alt="logo" />
		</AbsoluteFill>
	);
};
