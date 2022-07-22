import {spring, Video, Audio} from 'remotion';
import {
    AbsoluteFill,
    interpolate,
    Sequence,
    useCurrentFrame,
    useVideoConfig,
} from 'remotion';
import {Logo} from './ZebraCat/Logo';
import {Subtitle} from './ZebraCat/Subtitle';
import {Title} from './ZebraCat/Title';

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

export const ZebraCat: React.FC<Props> = (props) => {
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
        [durationInFrames - (fps * 3), durationInFrames - (fps * 0)],
        [1, 1],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        }
    );

    return (
        <AbsoluteFill>
            <AbsoluteFill style={{opacity, zIndex: 0}}>
                <Audio
                    src={require('./input_data/footage/Sunsets30s.wav')}
                    startFrom={0} // If composition is 30fps, then it will start at 2s
                    endAt={durationInFrames} // If composition is 30fps, then it will end at 4s
                />
                {[...Array(8).keys()].map((i) => (
                    <Sequence from={fps * i * 3 + fps} durationInFrames={fps * 3}>
                        <Video
                            src={require(`./input_data/footage/${props.footage[i]}`)}
                            startFrom={fps} // If the video is 30fps, then it will start at 2s
                            endAt={fps * 6} // If the video is 30fps, then it will end at 4s
                            volume={0}
                            width={406}
                            height={720}
                        />
                    </Sequence>
                ))}
                <Sequence from={fps * 8 * 3 + fps} durationInFrames={fps * 6}>
                    <Video
                        src={require(`./input_data/footage/${props.footage[8]}`)}
                        startFrom={30} // If the video is 30fps, then it will start at 2s
                        endAt={fps * 6} // If the video is 30fps, then it will end at 4s
                        volume={0}
                    />
                </Sequence>
            </AbsoluteFill>
            <AbsoluteFill style={{backgroundColor: 'black', opacity: 0.5, zIndex: 1}}>
                <Sequence from={fps} durationInFrames={fps * 6}>
                    <Logo/>
                </Sequence>
                <Sequence from={fps} durationInFrames={fps * 6}>
                    <Title titleText="hello1" titleColor={props.color[0]} />
                </Sequence>
                <Sequence from={fps * 7} durationInFrames={fps * 6}>
                    <Title titleText="hello2" titleColor={props.color[0]} />
                </Sequence>
                <Sequence from={fps * 13} durationInFrames={fps * 6}>
                    <Title titleText="hello3" titleColor={props.color[0]} />
                </Sequence>
                <Sequence from={fps * 19} durationInFrames={fps * 6}>
                    <Title titleText="hello4" titleColor={props.color[0]} />
                </Sequence>
                <Sequence from={fps * 25} durationInFrames={fps * 6}>
                    <Logo/>
                </Sequence>
                <Sequence from={fps * 25} durationInFrames={fps * 6}>
                    <Title titleText="hello5" titleColor={props.color[0]} />
                </Sequence>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
