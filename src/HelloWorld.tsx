import {spring, Video, Audio} from 'remotion';
import {
    AbsoluteFill,
    interpolate,
    Sequence,
    useCurrentFrame,
    useVideoConfig,
} from 'remotion';
import {Logo} from './HelloWorld/Logo';
import {Subtitle} from './HelloWorld/Subtitle';
import {Title} from './HelloWorld/Title';
    import vid1 from './input_data/footage/1.mp4'

interface MiddleText {
    main: string,
    secondary: string
}

interface Props {
    save_path: string,
    text: {
        start_text: Array<string>,
        middle_text: Array<MiddleText>
        end_text: Array<string>
    },
    footage: Array<string>
    color: Array<string>
    main_font: Array<string>
    secondary_font: Array<string>
}

export const HelloWorld: React.FC<Props> = (props) => {
    const frame = useCurrentFrame();
    const {durationInFrames, fps} = useVideoConfig();
    console.log(props)
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
        [durationInFrames - 25, durationInFrames - 15],
        [1, 0],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        }
    );

    // A <AbsoluteFill> is just a absolutely positioned <div>!
    return (
        <AbsoluteFill style={{backgroundColor: 'white'}}>
            <AbsoluteFill style={{opacity}}>
                <Audio
                    src={require('./input_data/footage/Sunsets30s.wav')}
                    startFrom={0} // If composition is 30fps, then it will start at 2s
                    endAt={durationInFrames} // If composition is 30fps, then it will end at 4s
                />
                {[...Array(10).keys()].map((i) => (
                    <Sequence from={fps * i * 3} durationInFrames={fps * 3}>
                        <Video
                            src={require(`./input_data/footage/${props.footage[9]}`)}
                            startFrom={0} // If the video is 30fps, then it will start at 2s
                            endAt={fps * 3} // If the video is 30fps, then it will end at 4s
                        />
                    </Sequence>
                ))}
				{/* <AbsoluteFill style={{transform: `translateY(${logoTranslation}px)`}}> */}
                {/*     <Logo/> */}
                {/* </AbsoluteFill> */}
                {/* Sequences can shift the time for its children! */}
                {/* <Sequence from={35}> */}
                {/*     <Title titleText={props.text.start_text[0]} titleColor="#0F0"/> */}
                {/* </Sequence> */}
                {/* /!* The subtitle will only enter on the 75th frame. *!/ */}
                {/* <Sequence from={75}> */}
                {/*     <Subtitle/> */}
                {/* </Sequence> */}
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
