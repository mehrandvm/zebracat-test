import {Composition} from 'remotion';
import {HelloWorld} from './HelloWorld';
// Each <Composition> is an entry in the sidebar!
import config from './input_data/config.json'
export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				// You can take the "id" to render a video:
				// npx remotion render src/index.tsx <id> out/video.mp4
				id="HelloWorld"
				component={HelloWorld}
				durationInFrames={30 * 30}
				fps={30}
				width={406}
				height={720}
				defaultProps={{...config}}
				// You can override these props for each render:
				// https://www.remotion.dev/docs/parametrized-rendering
			/>
			{/* /!* Mount any React component to make it show up in the sidebar and work on it individually! *!/ */}
			{/* <Composition */}
			{/* 	id="OnlyLogo" */}
			{/* 	component={Logo} */}
			{/* 	durationInFrames={150} */}
			{/* 	fps={30} */}
			{/* 	width={1920} */}
			{/* 	height={1080} */}
			{/* /> */}
		</>
	);
};
