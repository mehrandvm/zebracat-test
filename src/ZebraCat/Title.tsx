import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';

const title: React.CSSProperties = {
	fontFamily: 'arial',
	fontWeight: 'bold',
	fontSize: 48,
	textAlign: 'center',
	position: 'absolute',
	bottom: 160,
	width: '100%',
};

const word: React.CSSProperties = {
	marginLeft: 10,
	marginRight: 10,
	display: 'inline-block',
};

export const Title: React.FC<{
	titleText: string;
	titleColor: string;
}> = ({titleText, titleColor}) => {
	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();

	const words = titleText.split(' ');

	return (
		<h1 style={title}>
			{words.map((t, i) => {
				const delay = i * 5;

				const scale = spring({
					fps: videoConfig.fps,
					frame: frame - delay,
					config: {
						damping: 200,
					},
					durationInFrames: 60
				});

				const scale2 = spring({
					fps: videoConfig.fps,
					frame: frame - delay - 150,
					config: {
						damping: 200,
					},
					durationInFrames: 30
				});

				console.log('scale2', scale2);

				return (
					<span
						key={t}
						style={{
							...word,
							color: titleColor,
							transform: `translateY(${100 - (100 * (scale - scale2))}%)`,
						}}
					>
						{t}
					</span>
				);
			})}
		</h1>
	);
};
