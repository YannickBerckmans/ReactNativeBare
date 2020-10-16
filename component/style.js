import styled, { keyframes } from 'styled-components/native';
import { Text, View } from 'react-native';

export const Grid = styled.View`
        display : flex;
        justify-content: center;
        height : 50px;
`;

export const Row = styled.View`
        margin-top: 6px;
        display : flex;
`;

export const Col = styled.View`
        flex: ${(props) => props.size};
        text-align: center;
        width: ${(props) => props.width};
`; 