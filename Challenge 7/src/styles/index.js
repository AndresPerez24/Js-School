import styled, {css} from "styled-components"

export const Container = styled.div`
  max-width: ${props => props.large ? "1300px" : props.medium ? "1000px" : props.small ? "800px" : props.width || "100%"};
  padding: ${props => props.padding };
  background: ${props => props.background || ""};
  margin: ${props => props.margin || "0 auto"};
  text-align: ${props => props.textAlign || "left" };
  position: ${props => props.position || "" };
  ${props => props.flex ? flex : ""}
`

const flex = css`
  display: flex;
  justify-content: ${props => props.justifyContent || ""};
  flex-direction: ${props => props.flexDirection || "" };
  flex-wrap: ${props => props.flexWrap || "" };
  align-items: ${props => props.alignItems || ""};
`

export function Modifier(props) {
	const modifiers = Object.keys(props).filter(propName =>
		propName.startsWith('_'),
	)
	return [props.className, ...modifiers].join(' ')
}

const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '766px',
  laptop: '1024px',
  laptopM: '1220px',
  laptopL: '1440px',
  desktop: '2560px'
}

export const Device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopM: `(min-width: ${size.laptopM})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`
};