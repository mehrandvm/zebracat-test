import {
	AbsoluteFill, Img,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

import logo from '../input_data/logo_zebra.png'

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

	const logoRotation = interpolate(
		frame,
		[0, videoConfig.durationInFrames],
		[0, 360]
	);

	return (
		<AbsoluteFill
			style={{
				transform: `scale(${scale}) rotate(${logoRotation}deg)`,
			}}
		>
			<Img height={400} width={400} src={logo} alt="logo"/>
		</AbsoluteFill>
	);
};
