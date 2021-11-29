import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  & > div {
    box-sizing: border-box;
    width: calc(1 / 3 * 100% - (1 - 1 / 3) * 10px);
  }
`;
