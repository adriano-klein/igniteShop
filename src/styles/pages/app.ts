import { styled } from "..";

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh',
});

export const Header = styled("header", {
  padding: "2rem 0",
  width: "100%",
  maxWidth: "1180px",
  margin: "0 auto",
  display: "inline-flex",
  justifyContent: "space-between",
  position: "relative",

  'a:last-child': {
    backgroundColor: "$gray800",
    color: "$gray300",
    textDecoration: "none",
    opacity: 0.8,
    width: "2rem",
    height: "2rem",
    padding: 12,
    boxSizing: "content-box",
    borderRadius: 6,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative", // Adiciona posição relativa ao contêiner pai

    "&:hover": {
      cursor: "pointer",
      backgroundColor: "$green300",
      transition: "all 0.2s ease-in-out",
    },

    span: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "1rem",
      height: "1rem",
      borderRadius: "50%",
      backgroundColor: "$green300",
      padding: "0.70rem",
      position: "absolute", // Define posição absoluta para o span
      bottom: "0", // Posiciona o span no canto inferior
      right: "0", // Posiciona o span no canto direito
    },
  },
});