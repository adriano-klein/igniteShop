import {styled} from '..'

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: '0 auto',
  color: '$gray300',
  textAlign: 'center',
  width: '36rem',
  fontSize: '$md',

  span:{
    color: '$green300',
    fontSize: '$lg',
    fontWeight: 'bold',
    marginTop: '4rem',
  },
  h1: {
    marginBottom: '1.5rem',
  },

})

export const ProductsContainer = styled("section", {
  padding: "2rem",
  margin: "0 auto",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "2rem",

  section: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "140px",
    height: "140px",
    borderRadius: "50%",
    padding: "1rem",
    marginLeft: "-2rem",
    background: "linear-gradient(180deg, #1ea486 0%, #7465d4 100%)",
    boxShadow: "0px 0px 60px 0px rgba(0, 0, 0, 0.80)",
  },

  Image: {
    borderRadius: "0.5rem",
    margin: "0 auto",
  },
});