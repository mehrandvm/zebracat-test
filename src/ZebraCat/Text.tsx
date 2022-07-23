import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';

const title: React.CSSProperties = {
	fontFamily: 'arial',
	fontWeight: 'bold',
	fontSize: 48,
	textAlign: 'center',
	// Position: 'absolute',
	width: '100%',
};

const subtitle: React.CSSProperties = {
	fontFamily: 'arial',
	fontWeight: 'normal',
	fontSize: 32,
	textAlign: 'center',
	// Position: 'absolute',
	width: '100%',
};

const word: React.CSSProperties = {
	marginLeft: 10,
	marginRight: 10,
	display: 'inline-block',
};

export const Text: React.FC<{
	titleText: string;
	titleColor: string;
	subtitleText?: string;
}> = ({titleText, titleColor, subtitleText}) => {
	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();

	const words = titleText.split(' ');
	const words2 = subtitleText?.split(' ');

	return (
		<div>
			<h2 style={title}>
				{words.map((t, i) => {
					const delay = i * 2;

					const scaleIn = spring({
						fps: videoConfig.fps,
						frame: frame - delay,
						config: {
							damping: 200,
						},
						durationInFrames: 60,
					});

					const scaleOut = spring({
						fps: videoConfig.fps,
						frame: frame - delay - 150,
						config: {
							damping: 200,
						},
						durationInFrames: 30,
					});

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
									color: titleColor,
									transform: `translateY(${100 - 100 * (scaleIn - scaleOut)}%)`,
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
					{words2!.map((t, i) => {
						const delay = i * 2;

						const scaleIn = spring({
							fps: videoConfig.fps,
							frame: frame - delay - 15,
							config: {
								damping: 200,
							},
							durationInFrames: 45,
						});

						const scaleOut = spring({
							fps: videoConfig.fps,
							frame: frame - delay - 150,
							config: {
								damping: 200,
							},
							durationInFrames: 30,
						});

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
										color: titleColor,
										transform: `translateY(${
											100 - 100 * (scaleIn - scaleOut)
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
