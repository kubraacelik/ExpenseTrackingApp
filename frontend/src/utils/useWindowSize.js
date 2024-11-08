import { useEffect, useState } from "react";

export const useWindowSize = () => {
  // pencere boyutlarını tutar
  const [size, setSize] = useState([0, 0]);

  useEffect(() => {
    // pencere boyutları değiştiğinde çağrılır
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    // pencere boyutu değiştiğinde (resize) updateSize fonksiyonu çalışır
    window.addEventListener("resize", updateSize);

    // bileşen yeniden render edildiğinde, event listener'ı temizler (resize olayını durdurur)
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // pencerenin genişliği (size[0]), yüksekliği (size[1])
  return {
    width: size[0],
    height: size[1],
  };
};
