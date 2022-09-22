import styled from "styled-components";

export const BaseButton = styled.button`
  min-width: 120px;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 1em;
  font-size: 15px;
  background-color: black;
  color: white;
  font-family: inherit;
  font-weight: bolder;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`;

export const GoogleSignInButton = styled(BaseButton)`
  background-color: #cc3636;
  color: white;

  &:hover {
    background-color: white;
    color: #cc3636;
    border: 1px solid #cc3636;
  }
`;

export const FacebookSignInButton = styled(BaseButton)`
  background-color: #277bc0;
  color: white;

  &:hover {
    background-color: white;
    color: #277bc0;
    border: 1px solid #277bc0;
  }
`;

export const InvertedButton = styled(BaseButton)`
  background-color: white;
  color: black;
  border: 1px solid black;

  &:hover {
    background-color: black;
    color: white;
    border: none;
  }
`;
