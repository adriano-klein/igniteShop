import Link from "next/link";
import Image from "next/image";
import logoImg from "../assets/logo.svg";
import { SuccessHeaderContainer } from "../styles/Components/SuccessHeader";

export default function SuccessHeader(){
  return (
    <SuccessHeaderContainer>
      <Link href="/">
        <Image src={logoImg} alt="" />
      </Link>
    </SuccessHeaderContainer>
  );
}