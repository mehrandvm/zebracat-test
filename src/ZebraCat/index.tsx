import {spring, Video, Audio} from 'remotion';
import {
	AbsoluteFill,
	interpolate,
	Sequence,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {Logo} from './Logo';
import {Text} from './Text';

interface MiddleText {
	main: string;
	secondary: string;
}

interface Props {
	save_path: string;
	text: {
		start_text: Array<string>;
		middle_text: Array<MiddleText>;
		end_text: Array<string>;
	};
	footage: Array<string>;
	color: Array<string>;
	main_font: Array<string>;
	secondary_font: Array<string>;
}

export const ZebraCat: React.FC<Props> = (props) => {
	const frame = useCurrentFrame();
	const {durationInFrames, fps} = useVideoConfig();
	console.log(props);
	// Animate from 0 to 1 after 25 frames
	const logoTranslationProgress = spring({
		frame: frame - 25,
		fps,
		config: {
			damping: 100,
		},
	});

	// Move the logo up by 150 pixels once the transition starts
	const logoTranslation = interpolate(
		logoTranslationProgress,
		[0, 1],
		[0, -150]
	);

	// Fade out the animation at the end
	const opacity = interpolate(
		frame,
		[durationInFrames - fps * 3, durationInFrames - fps * 0],
		[1, 1],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}
	);

	const opacity2 = interpolate(frame, [0, fps], [0, 0.5], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const opacity3 = interpolate(frame, [15, fps], [1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill>
			<AbsoluteFill style={{opacity, zIndex: 0}}>
				<Audio
					src={require('/src/input_data/footage/Sunsets30s.wav')}
					startFrom={0} // If composition is 30fps, then it will start at 2s
					endAt={durationInFrames} // If composition is 30fps, then it will end at 4s
				/>
				<Sequence from={0} durationInFrames={fps * 4}>
					<Video
						src={require(`/src/input_data/footage/${props.footage[0]}`)}
						startFrom={fps} // If the video is 30fps, then it will start at 2s
						endAt={fps * 6} // If the video is 30fps, then it will end at 4s
						volume={0}
					/>
				</Sequence>
				{[...Array(7).keys()].map((i) => (
					<Sequence from={fps * (i + 1) * 3 + fps} durationInFrames={fps * 3}>
						<Video
							src={require(`/src/input_data/footage/${props.footage[i + 1]}`)}
							startFrom={fps} // If the video is 30fps, then it will start at 2s
							endAt={fps * 6} // If the video is 30fps, then it will end at 4s
							volume={0}
						/>
					</Sequence>
				))}
				<Sequence from={fps * 8 * 3 + fps} durationInFrames={fps * 6}>
					<Video
						src={require(`/src/input_data/footage/${props.footage[8]}`)}
						startFrom={30} // If the video is 30fps, then it will start at 2s
						endAt={fps * 6} // If the video is 30fps, then it will end at 4s
						volume={0}
					/>
				</Sequence>
			</AbsoluteFill>
			<AbsoluteFill
				style={{backgroundColor: 'black', opacity: opacity2, zIndex: 1}}
			/>
			<AbsoluteFill style={{zIndex: 2}}>
				<Sequence from={fps} durationInFrames={fps * 6}>
					<Text
						titleText={props.text.start_text[0]}
						titleFont={props.main_font[0]}
						titleColor={props.color[2]}
						justifyContent="center"
					/>
				</Sequence>
				<Sequence from={fps * 7} durationInFrames={fps * 6}>
					<Text
						titleText={props.text.middle_text[0].main}
						titleFont={props.main_font[0]}
						titleColor={props.color[3]}
						subtitleText={props.text.middle_text[0].secondary}
						subtitleFont={props.secondary_font[0]}
						subtitleColor={props.color[2]}
						justifyContent="center"
					/>
				</Sequence>
				<Sequence from={fps * 13} durationInFrames={fps * 6}>
					<Text
						titleText={props.text.middle_text[1].main}
						titleFont={props.main_font[0]}
						titleColor={props.color[2]}
						subtitleText={props.text.middle_text[1].secondary}
						subtitleFont={props.secondary_font[0]}
						subtitleColor={props.color[3]}
						justifyContent="space-evenly"
					/>
				</Sequence>
				<Sequence from={fps * 19} durationInFrames={fps * 6}>
					<Text
						titleText={props.text.middle_text[2].main}
						titleFont={props.main_font[0]}
						titleColor={props.color[3]}
						subtitleText={props.text.middle_text[2].secondary}
						subtitleFont={props.secondary_font[0]}
						subtitleColor={props.color[2]}
						justifyContent="space-around"
					/>
				</Sequence>
				<Sequence from={fps * 25} durationInFrames={fps * 6}>
					<Text
						titleText={props.text.end_text[0]}
						titleColor={props.color[2]}
						titleFont={props.main_font[0]}
						justifyContent="flex-end"
					/>
				</Sequence>
			</AbsoluteFill>
			<AbsoluteFill
				style={{
					backgroundColor: props.color[1],
					opacity: opacity3,
					zIndex: 3,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Logo />
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
