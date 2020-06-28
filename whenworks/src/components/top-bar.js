import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 48px;
    width: 100%;
    background-color: white;
    z-index: 2;
`;
// box-shadow: 0 3px 5px rgba(0,0,0,.09)    

const Name = styled.div`
    float: left;
    line-height: 50px;
    font-size: 1.7em;
    padding-left: 16px;
    cursor: pointer;
`;

export default function TopBar() {
    const history = useHistory();

    const goHome = (result) => {
        history.push('/');
    }

    return (
        <Container>
            <Name onClick={goHome}>WhenWorks.io</Name>
        </Container>
    );
    
}