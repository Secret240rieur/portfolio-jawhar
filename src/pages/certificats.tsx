import React from "react";
import "./certificats.css";
import Navbardown from "./navbardown";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';

const pdfHtml = require('../Assets/Certificats/Html_certificate.pdf');
const pdfCss = require("../Assets/Certificats/Css_certificate.pdf");
const pdfC_Sharp = require("../Assets/Certificats/C_Sharp_certificate.pdf");
const pdfReact = require("../Assets/Certificats/react_certificate.pdf");

const Certificats = () => {
    return (
        <div>
            <div className="certificats">
                <ul>
                    <h2>Mes certificats en programmation</h2>
                    <li id="Html">Certificat en Html5
                        <Document file={pdfHtml}>
                            <Page pageNumber={1} />
                        </Document>
                    </li>
                    <li id="CSS">Certificat en CSS
                        <Document file={pdfCss}>
                            <Page pageNumber={1} />
                        </Document>                    </li>
                    <li id="react">Certificat en React Native
                        <Document file={pdfReact}>
                            <Page pageNumber={1} />
                        </Document>                    </li>
                    <li id="C_Sharp">Certificat en C#
                        <Document file={pdfC_Sharp}>
                            <Page pageNumber={1} />
                        </Document>                    </li>
                </ul>
            </div>
            <Navbardown />
        </div>
    );
}

export default Certificats;