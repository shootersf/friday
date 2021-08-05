import styled from "styled-components";

export const StyledWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin: 5px;
`

export const StyledHazardCard = styled.div`
	width: 200px;
	height: 200px;
	background-color: crimson;
	position: relative;
	display: flex;
	justify-content: center;
`

export const StyledName = styled.div`
	padding-top: 0.5rem;
	text-align: center;
	font-size: 1.2rem;
	max-width: 120px;
`

export const StyledFree = styled.div`
	font-size: 1.7rem;
	position: absolute;
	top: 10px;
	left: 5px;
	padding: 3px;
	padding-left: 5px;
	padding-right: 5px;
	border-radius: 50%;
	background-color: white;
`

export const StyledToughness = styled.div`
	font-size: 1.7rem;
	position: absolute;
	top: 40px;
	right: 5px;
	color: black;
	background-color: green;
	padding: 3px;
	padding-left: 5px;
	padding-right: 5px;
	border-radius: 50%;
`