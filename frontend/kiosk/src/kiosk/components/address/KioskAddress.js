/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useParams } from "react-router";

const addressDiv = css`
  height: 80px;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;

  .addressIcon {
    position: absolute;
    top: -7px;
    left: -36px;
  }
`;

const addressFont = css`
  font-size: 32px;
`;

const KioskAddress = () => {
  const { id } = useParams();
  const [address, setAddress] = useState("");

  const getAddress = useCallback(async () => {
    const geoURL = `http://127.0.0.1:8080/api/kiosk/home/kiosk-geo?id=${id}`;
    let addressURL = "";

    try {
      const geoResponse = await axios.get(geoURL);
      const { lat, lng } = geoResponse.data;

      addressURL = `http://127.0.0.1:8080/api/address/reverse-geo?lat=${lat}&lng=${lng}`;

      const [addressResponse] = await axios.all([axios.get(addressURL)]);
      setAddress(addressResponse.data.address_name);
    } catch (err) {
      console.log(err);
    }
  });

  useEffect(() => {
    getAddress();
  }, [getAddress]);

  return (
    <div css={addressDiv}>
      <div className="addressIcon">
        <LocationOnIcon color="action" fontSize="large" />
      </div>
      <span css={addressFont}>{address}</span>
    </div>
  );
};

export default KioskAddress;
