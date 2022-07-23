import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';

interface Props {
	titleText: string;
	titleColor: string;
	titleFont: string;
	subtitleText?: string;
	subtitleColor?: string;
	subtitleFont?: string;
	justifyContent: string;
}

export const Text: React.FC<Props> = (props) => {
	const {
		titleText,
		titleColor,
		subtitleText,
		subtitleColor,
		titleFont,
		subtitleFont,
		justifyContent,
	} = props;
	const wrapper: React.CSSProperties = {
		display: 'flex',
		flexDirection: 'column',
		justifyContent,
		margin: '50px 0',
	};

	const title: React.CSSProperties = {
		fontFamily: titleFont,
		fontWeight: 'bold',
		fontSize: 48,
		textAlign: 'center',
		width: '100%',
		margin: '10px 0',
		color: titleColor,
	};

	const subtitle: React.CSSProperties = {
		fontFamily: subtitleFont || titleFont || 'arial',
		fontWeight: 'normal',
		fontSize: 32,
		textAlign: 'center',
		width: '100%',
		margin: '10px 0',
		color: subtitleColor || titleColor || '#FFF',
	};

	const word: React.CSSProperties = {
		marginLeft: 10,
		marginRight: 10,
		display: 'inline-block',
	};

	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();

	const titleWords = titleText.split(' ');
	const subtitleWords = subtitleText?.split(' ');

	const titleSlideIn = (delay: number) =>
		spring({
			fps: videoConfig.fps,
			frame: frame - delay,
			config: {
				damping: 200,
			},
			durationInFrames: 60,
		});

	const titleSlideOut = (delay: number) =>
		spring({
			fps: videoConfig.fps,
			frame: frame - delay - 150,
			config: {
				damping: 200,
			},
			durationInFrames: 30,
		});

	const subtitleSlideIn = (delay: number) =>
		spring({
			fps: videoConfig.fps,
			frame: frame - delay - 15,
			config: {
				damping: 200,
			},
			durationInFrames: 45,
		});

	const subtitleSlideOut = (delay: number) =>
		spring({
			fps: videoConfig.fps,
			frame: frame - delay - 150,
			config: {
				damping: 200,
			},
			durationInFrames: 30,
		});

	return (
		<div style={wrapper}>
			<h2 style={title}>
				{titleWords.map((t, i) => {
					const delay = i * 2;
					return (
						<span
							style={{
								overflow: 'hidden',
								display: 'inline-block',
							}}
						>
							<span
								key={t}
								style={{
									...word,
									transform: `translateY(${
										100 - 100 * (titleSlideIn(delay) - titleSlideOut(delay))
									}%)`,
								}}
							>
								{t}
							</span>
						</span>
					);
				})}
			</h2>
			{subtitleText && (
				<p style={subtitle}>
					{subtitleWords!.map((t, i) => {
						const delay = i * 2;
						return (
							<span
								style={{
									overflow: 'hidden',
									display: 'inline-block',
								}}
							>
								<span
									key={t}
									style={{
										...word,
										transform: `translateY(${
											100 -
											100 * (subtitleSlideIn(delay) - subtitleSlideOut(delay))
										}%)`,
									}}
								>
									{t}
								</span>
							</span>
						);
					})}
				</p>
			)}
		</div>
	);
};
