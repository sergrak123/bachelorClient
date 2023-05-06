import lentLogo from "../images/logo-lenta.png";
import metroLogo from "../images/Metro.png";
import vkusvillLogo from "../images/vkusvill.png";

export function storeImg() {
    let images = [
        {storeId: 1, name: "Лента", src: lentLogo},
        {storeId: 2, name: "Метро", src: metroLogo},
        {storeId: 3, name: "Вкусвилл", src: vkusvillLogo}
    ]
    return images
}