import { keyframes, styled } from "@stitches/react";
import * as Dialog from "@radix-ui/react-dialog";

// Efeitos de entrada e saída do modal de carringo de compras
const slideInFromRight = keyframes({
  '0%': { transform: 'translateX(100%)' },
  '100%': { transform: 'translateX(0)' },
});

const slideOutToRight = keyframes({
  "0%": { transform: "translateX(0)" },
  "100%": { transform: "translateX(100%)" },
});


export const StyledDialogContent = styled(Dialog.Content, {
  backgroundColor: "$gray800",
  borderRadius: 6,
  padding: "3rem",
  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
  position: "fixed",
  top: 0,
  right: 0,
  height: "100vh",
  width: "90%",
  maxWidth: "500px",
  display: "flex",
  flexDirection: "column",

  '&[data-state="open"]': {
    animation: `${slideInFromRight} 0.5s ease-out`,
  },

  '&[data-state="closed"]': {
    animation: `${slideOutToRight} 0.5s ease-out`,
  },

  svg: {
    margin: "0 auto",
  },
});

export const EmptyH4 = styled("h4", {
  textAlign: "center",
  marginTop: "1rem",
});


export const ProductsContainer = styled("div", {

  
})


export const QuantityInfo = styled("span", {
  marginTop: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "1rem 0",
  borderTop: "1px solid $gray700",
  color: "$gray100",

  p: {
    margin: 0,
  },

  span: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    color: "$gray300",
  },

  'span:last-child': {
    marginTop: "1rem",

    'p:first-child': {
      fontWeight: "bold",
      fontSize: "1.25rem",
    },
    'p:last-child': {
      fontSize: "1.5rem",
      fontWeight: "bold",
    }
  }
});

export const StyledDialogTitle = styled(Dialog.Title, {
  color: "$green300",
  marginTop: "4.5rem",
});

export const CloseButton = styled(Dialog.Close, {
  position: "absolute",
  top: "1rem",
  right: "1rem",
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "$gray100",
});


export const ProductContainer = styled("div", {
  alignItems: 'center',
  gap: '1.25rem',
  display: 'flex',
  flexDirection: 'row',
  marginTop: '2rem',
})

export const ProductFooter = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  width: "100%",

  span: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "0.5rem",
  },

  'span:last-child': {
    display: "flex",
    gap: "1.5rem",
    flexDirection: "row",
    justifyContent: "space-between",
    boxSizing:"content-box",
    backgroundColor: "$green200",
    width: "30%",
  },

  button: {
    color: "$green300",
    background: "none",
    border: "none",
    fontSize: "1rem",
    fontWeight: "bold",
    textAlign: "left",
    cursor: "pointer",
    
    "&:hover": {
      color: "$green500",
      transition: "color 0.5s",
    },
  },
});

export const ImageContainer = styled("div", {
  borderRadius: "8px",
  background: "linear-gradient(180deg, #1EA483 0%, #7465D4 100%)",
  height: "7.50rem",
  width: "7.50rem",
});

export const FinishPurchaseButton = styled("button", {
  background: "$green500",
  color: "$white",
  padding: "1.25rem",
  borderRadius: "8px",
  marginTop: "1rem",
  fontSize: "1.25rem",
  fontWeight: "bold",
  border: "none",
  cursor: "pointer",
  transition: "background 0.2s",

  '&:hover': {
    background: "$green300",
  }
})

export const EmptyBag = styled("div", {
  marginTop: "60%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
})
  
export const ClearCartButton = styled("button", {
  background: "$red500",
  color: "$white",
  padding: "0.25rem",
  borderRadius: "4px",
  marginTop: "1rem",
  fontWeight: "bold",
  border: "none",
  cursor: "pointer",
  transition: "background 0.2s",
  width: "25%",
  margin: "1rem auto 0",
  fontSize: "0.8rem",
});