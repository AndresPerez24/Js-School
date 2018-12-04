import styled, { css } from 'styled-components';

const flex = css`
  display: flex;
  justify-content: ${props => props.justifyContent || ''};
  flex-direction: ${props => props.flexDirection || ''};
  flex-wrap: ${props => props.flexWrap || ''};
  align-items: ${props => props.alignItems || ''};
`;

export const Container = styled.div`
  max-width: ${(props) => {
    if (props === props.large) {
      return '1300px';
    } if (props === props.medium) {
      return '1000px';
    } if (props === props.small) {
      return '800px';
    }
    return '100%';
  }};
  padding: ${props => props.padding};
  background: ${props => props.background || ''};
  margin: ${props => props.margin || '0 auto'};
  text-align: ${props => props.textAlign || 'left'};
  position: ${props => props.position || ''};
  ${props => (props.flex ? flex : '')};
`;

export function Modifier(props) {
  const modifiers = Object.keys(props).filter(propName => propName.startsWith('_'));
  return [props.className, ...modifiers].join(' ');
}

const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '766px',
  laptop: '1024px',
  laptopM: '1220px',
  laptopL: '1440px',
  desktop: '2560px',
};

export const Device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopM: `(min-width: ${size.laptopM})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
};
