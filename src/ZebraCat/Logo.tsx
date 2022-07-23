import {Img} from 'remotion';

import logo from '../input_data/logo_zebra.png';

export const Logo: React.FC = () => {
	return <Img height={54} width={250} src={logo} alt="logo" />;
};
