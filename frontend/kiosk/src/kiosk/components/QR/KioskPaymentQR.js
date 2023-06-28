// import axios from 'axios';
import { QRCodeSVG } from "qrcode.react";
import { useParams } from "react-router";

const KioskPaymentQR = () => {
  const { id } = useParams();

  return (
    <div>
      <QRCodeSVG
        value={`http://127.0.0.1/bp/before/payment?kioskId=${id}`}
        size={400}
        imageSettings={{
          src: `http://127.0.0.1/bp/before/payment?kioskId=${id}`,
          width: 10,
          height: 10,
        }}
        id="qr-gen"
        level={"H"}
        includeMargin={true}
        bgColor={"white"}
        fgColor={"#404040"}
      />
    </div>
  );
};

export default KioskPaymentQR;
