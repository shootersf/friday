import styled from "styled-components";

export const StyledFightingCard = styled.div`
	width: 200px;
	height: 200px;
	background-color: aquamarine;
	position: relative;
	display: flex;
	justify-content: center;
	transform: ${ props => (props.tapped) ? "rotate(90deg)" : ""};
`

export const StyledName = styled.div`
	padding-top: 0.5rem;
	text-align: center;
	font-size: 1.2rem;
	max-width: 120px;
`

export const StyledPower = styled.div`
	font-size: 1.7rem;
	position: absolute;
	top: 5px;
	left: 5px;
	padding: 3px;
	padding-left: 5px;
	padding-right: 5px;
	border-radius: 50%;
	background-color: white;
`

