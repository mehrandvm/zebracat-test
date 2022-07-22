import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';

const subtitle: React.CSSProperties = {
	fontFamily: 'arial',
	fontSize: 32,
	textAlign: 'center',
	position: 'absolute',
	bottom: 140,
	width: '100%',
};

const codeStyle: React.CSSProperties = {
	color: "#142E54",
};

export const Subtitle: React.FC = () => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [0, 30], [0, 1]);
	return (
		<div style={{...subtitle, opacity}}>
			Edit <code style={codeStyle}>src/Video.tsx</code> and save to reload.
		</div>
	);
};
