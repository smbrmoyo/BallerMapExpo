import React from "react";
import { View, Text, Image } from "react-native";
import libmoji from "libmoji";
import styles from "./styles";

/*function buildCpanelUrl(comicId, avatarId, transparent, scale) {
  return (
    "" +
    baseCpanelUrl +
    comicId +
    "-" +
    avatarId +
    "-v3.png?transparent=" +
    transparent +
    "&scale=" +
    scale
  );
}*/

/*console.log(
  libmoji.getAvatarId(
    "https://render.bitstrips.com/v2/cpanel/8968038-99397600010_1-s5-v1.png?transparent=1&palette=1"
  )
);*/

const Bitmoji = ({ avatarId }) => {
  const comicId = libmoji.getComicId(libmoji.randTemplate(libmoji.templates));

  const outfit = libmoji.randOutfit(
    libmoji.getOutfits(libmoji.randBrand(libmoji.getBrands("male")))
  );
  const gender = libmoji.genders[libmoji.randInt(2)];
  const style = libmoji.styles[libmoji.randInt(3)];
  const traits = libmoji.randTraits(libmoji.getTraits(gender[0], style[0]));

  return (
    <Image
      style={{
        width: 70,
        height: 70,
        resizeMode: "contain",
      }}
      source={{
        uri: libmoji.buildRenderUrl("10102514", avatarId, 1, 2, outfit),
      }}
    />
  );
};

export default Bitmoji;
