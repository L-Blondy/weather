import { keyframes } from 'styled-components';

export const fadeIn = ( op ) => keyframes`
	from { opacity: 0 }
	to { opacity: ${op } }
`
export const scaleX = keyframes`
	from { 
		transform: scaleX(0);
	}
	to { 
		transform: scaleX(1);
	}
`
export const pokeRight = keyframes`
	from { 
		transform: translateX(0);
	}
	to { 
		transform: translateX(20%);
	}
`
export const carousselAnim = ( itemWidth, prevScrollCount, scrollCount ) => keyframes`
	from { 
		transform: translateX(-${prevScrollCount * itemWidth + "px" });
	}
	to { 
		transform: translateX(-${scrollCount * itemWidth + "px" });
	}
`