import React from "react";
import styled, { keyframes } from "styled-components";
import { useWindowSize } from "../../utils/useWindowSize";

function Orb() {
  const { width, height } = useWindowSize();

  // Burada moveOrb adında bir animasyon tanımlanmıştır
  const moveOrb = keyframes`
    0%{
      transform: translate(0, 0); //Animasyonun başlangıç noktasıdır. Burada öğe hiçbir yere hareket etmez
    }
    50%{
      transform: translate(${width}px, ${height/2}px); //Animasyonun orta noktasında öğe, ekran genişliği kadar sağa, ekranın yarı yüksekliği kadar aşağı hareket eder.
    }
    100%{
      transform: translate(0, 0); //Animasyonun bitiş noktasıdır. Öğe, tekrar başlangıç noktasına geri döner.
    }
  `;

  const OrbStyled = styled.div`
    width: 70vh;
    height: 70vh;
    position: absolute;
    border-radius: 50%;
    margin-left: -37vh;
    margin-top: -37vh;
    background: linear-gradient(180deg, #f56692 0%, #f2994a 100%);
    filter: blur(200px);
    animation: ${moveOrb} 7s alternate linear infinite;
  `;

  return <OrbStyled></OrbStyled>;
}

export default Orb;
