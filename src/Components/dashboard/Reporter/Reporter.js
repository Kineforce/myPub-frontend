import { useState } from "react";
import api from "../../../api";

import "./Reporter.css";

import React from "react";
import { Bar } from "react-chartjs-2";

const GroupedBar = ({ reportData }) => {
  const data = {
    labels: [...reportData.years],
    datasets: [
      {
        label: "Total de dívidas R$",
        data: [...reportData.sumDebts],
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "Total de pagamentos R$",
        data: [...reportData.sumProfits],
        backgroundColor: "rgb(54, 162, 235)",
      },
    ],
  };

  return (
    <>
      <div className="header">
        <h1 className="title" style={{ textAlign: "center" }}>
          Relação de dívidas e pagamentos
        </h1>
        <div className="links">
          <a
            className="btn btn-gh"
            href="https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/GroupedBar.js"
          >
            Github Source
          </a>
        </div>
      </div>
      <Bar data={data} className="reportCanvas" />
    </>
  );
};

const ReportData = () => {
  const [reportData, setReportData] = useState({
    sumDebts: [],
    sumProfits: [],
    years: [],
  });

  const [dataReport, setDataReport] = useState({
    year: "",
    month: "",
    client: "",
  });

  function handleSubmit(event) {
    event.preventDefault();

    api
      .get(
        `api/clients/getReport/${
          dataReport.year === "" ? "empty" : dataReport.year
        }/${dataReport.month === "" ? "empty" : dataReport.month}/${
          dataReport.client === "" ? "empty" : dataReport.client
        }`
      )
      .then((response) => {
        let sumDebts = [];
        let sumProfits = [];
        let years = [];

        response.data[1].map((pos) => {
          return years.push(pos.date_part);
        });

        for (let i = 0; i < years.length; i++) {
          sumDebts[i] = 0;
          sumProfits[i] = 0;

          for (let j = 0; j < response.data[0].length; j++) {
            if (response.data[0][j].created_at.substring(0, 4) === years[i]) {
              if (response.data[0][j].action === "Deveu") {
                sumDebts[i] = sumDebts[i] + response.data[0][j].price;
              } else {
                sumProfits[i] = sumProfits[i] + response.data[0][j].price;
              }
            }
          }
        }

        setReportData({
          sumDebts: sumDebts,
          sumProfits: sumProfits,
          years: years,
        });
      });
  }

  function handleValue(event) {
    const { name, value } = event.target;

    if (name === "year" || name === "month") {
      if (value.match(/[^0-9]/gi)) {
        return;
      }
    }

    setDataReport({
      ...dataReport,
      [name]: value,
    });
  }

  return (
    <div className="Report">
      <form onSubmit={handleSubmit} className="formReport">
        <input
          type="text"
          name="year"
          placeholder="Insira o ano..."
          value={dataReport.year}
          onChange={handleValue}
        />
        {/* <input
          type="text"
          name="month"
          placeholder="Insira o mês..."
          value={dataReport.month}
          onChange={handleValue}
        /> */}
        <input
          type="text"
          name="client"
          placeholder="Insira o cliente..."
          value={dataReport.client}
          onChange={handleValue}
        />
        <button type="submit">Enviar</button>
      </form>

      <div className="containerResultsReport">
        <div className="ResultsReport">
          <GroupedBar reportData={reportData} />
        </div>
      </div>
    </div>
  );
};

export default ReportData;
