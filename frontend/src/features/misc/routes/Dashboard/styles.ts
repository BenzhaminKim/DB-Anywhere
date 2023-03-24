import styled from 'styled-components';

export const StyledDashboardMain = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
`;

export const StyledDashboardContent = styled.div`
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    width: 345px;
  }

  /* Small devices (portrait tablets and large phones, 600px and up)
  */
  @media only screen and (min-width: 600px) {...}

  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    //width: 690px;

  }

  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
  }

  /* Extra large devices (large laptops and desktops, 1200px and up) */
  @media only screen and (min-width: 1200px) {
    width: 1035px
  }
`;
