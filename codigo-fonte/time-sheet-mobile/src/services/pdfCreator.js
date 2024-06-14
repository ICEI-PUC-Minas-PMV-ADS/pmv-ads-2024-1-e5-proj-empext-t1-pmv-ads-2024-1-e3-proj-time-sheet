import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { calculateJourneyStats } from "./JourneyService";
import * as FileSystem from 'expo-file-system';

import { Platform } from 'react-native';
import jsPDF from 'jspdf';

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const main_template = `
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">

<head>
  <meta http-equiv=Content-Type content="text/html; charset=windows-1252">
  <style>
    .style0 {
      text-align: general;
      vertical-align: bottom;
      white-space: nowrap;
      color: black;
      font-size: 11.0pt;
      font-weight: 400;
      font-style: normal;
      text-decoration: none;
      font-family: Calibri, sans-serif;
      border: none;
    }

    td {
      padding-top: 1px;
      padding-right: 1px;
      padding-left: 1px;
      color: black;
      font-size: 11.0pt;
      font-weight: 400;
      font-style: normal;
      text-decoration: none;
      font-family: Calibri, sans-serif;
      text-align: general;
      vertical-align: bottom;
      border: none;
      white-space: nowrap;
    }

    .table-header {
      color: white;
      font-size: 12.0pt;
      font-weight: 700;
      text-align: center;
      vertical-align: middle;
      border: .5pt solid black;
      background: #345255;
    }

    .table-value {
      text-align: center;
      vertical-align: middle;
      border-top: none;
      border: .5pt solid black;
    }

    .company-name {
      color: white;
      font-size: 16.0pt;
      font-weight: 700;
      text-align: center;
      vertical-align: middle;
      border: .5pt solid black;
      background: #1E3F42;
    }

    .employee-label {
      font-size: 12.0pt;
      font-weight: 700;
      text-align: right;
      vertical-align: middle;
      border: .5pt solid black;
    }

    .employee-name {
      font-size: 12.0pt;
      text-align: left;
      vertical-align: middle;
      border: .5pt solid black;
    }

    .employee-value {
      font-size: 12.0pt;
      text-align: center;
      vertical-align: middle;
      border: .5pt solid black;
    }

    .ass-line {
        font-size: 14.0pt;
	    text-align:center;
    }

  </style>
</head>

<div id="pdf-content">

<body link="#0563C1" vlink="#954F72">

  <table border=0 cellpadding=0 cellspacing=0 width=865 style='border-collapse:collapse;table-layout:fixed;width:651pt'>
    <col style='width:24pt'>
    <col span=9 style='width:67pt'>
    <col style='width:24pt'>
    <tr style='height:18.0pt'>
      <td colspan=11></td>
    </tr>
    <tr style='height:18.0pt'>
      <td></td>
      <td colspan=9 rowspan=2 class=company-name>Latícinios Triunfo</td>
      <td></td>
    </tr>
    <tr style='height:18.0pt'>
      <td style='height:18.0pt'></td>
    </tr>
    <tr height=24 style='height:18.0pt'>
      <td height=24 style='height:18.0pt'></td>
      <td colspan=2 class=employee-label>Funcionário: </td>
      <td colspan=4 class=employee-name>{user_name}</td>
      <td colspan=1 class=employee-label>CPF: </td>
      <td colspan=2 class=employee-value>{user_cpf}</td>
      <td height=24 style='height:18.0pt'></td>
    </tr>
    <tr height=24 style='height:18.0pt'>
      <td height=24 style='height:18.0pt'></td>
      <td colspan=2 class=employee-label>Carga horária: </td>
      <td colspan=1 class=employee-value>{user_journey_time}h</td>
      <td colspan=2 class=employee-label>Almoço: </td>
      <td colspan=1 class=employee-value>{user_lunch_time}h</td>
      <td colspan=1 class=employee-label>Data: </td>
      <td colspan=2 class=employee-value>{date}</td>
      <td height=24 style='height:18.0pt'></td>
    </tr>
    <tr height=24 style='height:18.0pt'>
      <td height=24 style='height:18.0pt'></td>
      <td colspan=9></td>
      <td height=24 style='height:18.0pt'></td>
    </tr>
    <tr height=24 style='height:18.0pt'>
      <td height=24 style='height:18.0pt'></td>
      <td colspan=1 class=table-header>Dias</td>
      <td colspan=2 class=table-header>Horas Trabalhadas</td>
      <td colspan=2 class=table-header>Horas extras</td>
      <td colspan=2 class=table-header>Horas totais</td>
      <td colspan=2 class=table-header>Atestados</td>
      <td height=24 style='height:18.0pt'></td>
    </tr>
    <tr height=24 style='height:18.0pt'>
      <td height=24 style='height:18.0pt'></td>
      <td colspan=1 class=table-value>{journey_days}</td>
      <td colspan=2 class=table-value>{journey_worktime}</td>
      <td colspan=2 class=table-value>{journey_extratime}</td>
      <td colspan=2 class=table-value>{journey_totaltime}</td>
      <td colspan=2 class=table-value>{journey_excused_absences}</td>
      <td height=24 style='height:18.0pt'></td>
    </tr>
    <tr height=24 style='height:18.0pt'>
      <td height=24 style='height:18.0pt'></td>
      <td colspan=9></td>
      <td height=24 style='height:18.0pt'></td>
    </tr>
    <tr height=24 style='height:18.0pt'>
      <td height=24 style='height:18.0pt'></td>
      <td colspan=1 class=table-header>Dia</td>
      <td colspan=2 class=table-header>Entrada</td>
      <td colspan=2 class=table-header>Saída</td>
      <td colspan=2 class=table-header>Retorno</td>
      <td colspan=2 class=table-header>Final</td>
      <td height=24 style='height:18.0pt'></td>
    </tr>
    {journeys}
    <tr height=40 style='height:30.0pt;'>
        <td height=40 colspan=10 style='height:30.0pt;'></td>
    </tr>
    <tr height=20 style='height:15.0pt'>
        <td height=20 style='height:15.0pt'></td>
        <td colspan=4 class=ass-line>_________________________________</td>
        <td></td>
        <td colspan=4 class=ass-line>_________________________________</td>
        <td height=20 style='height:15.0pt'></td>
    </tr>
    <tr height=20 style='height:15.0pt'>
        <td height=20 style='height:15.0pt'></td>
        <td colspan=4 class=ass-line>Empregador</td>
        <td></td>
        <td colspan=4 class=ass-line>{user_name}</td>
        <td height=20 style='height:15.0pt'></td>
    </tr>
    <tr height=0 style='display:none'>
      <td width=64 style='width:48pt'></td>
      <td width=89 style='width:67pt'></td>
      <td width=89 style='width:67pt'></td>
      <td width=89 style='width:67pt'></td>
      <td width=89 style='width:67pt'></td>
      <td width=89 style='width:67pt'></td>
      <td width=89 style='width:67pt'></td>
      <td width=89 style='width:67pt'></td>
      <td width=89 style='width:67pt'></td>
      <td width=89 style='width:67pt'></td>
      <td width=64 style='width:48pt'></td>
    </tr>
  </table>
</body>
</div>

</html>
`;

const journey_template = `
    <tr height=24 style='height:18.0pt'>
      <td height=24 style='height:18.0pt'></td>
      <td colspan=1 class=table-value>{day}</td>
      <td colspan=2 class=table-value>{start_time}</td>
      <td colspan=2 class=table-value>{start_lunch_time}</td>
      <td colspan=2 class=table-value>{finish_lunch_time}</td>
      <td colspan=2 class=table-value>{finish_time}</td>
      <td height=24 style='height:18.0pt'></td>
    </tr>
`;

const journey_absence_template = `
    <tr height=24 style='height:18.0pt'>
      <td height=24 style='height:18.0pt'></td>
      <td colspan=1 class=table-value>{day}</td>
      <td colspan=8 class=table-value>Falta justificada</td>
      <td height=24 style='height:18.0pt'></td>
    </tr>
`;

const empty_template = `
    <tr height=24 style='height:18.0pt'>
      <td height=24 style='height:18.0pt'></td>
      <td colspan=1 class=table-value></td>
      <td colspan=2 class=table-value></td>
      <td colspan=2 class=table-value></td>
      <td colspan=2 class=table-value></td>
      <td colspan=2 class=table-value></td>
      <td height=24 style='height:18.0pt'></td>
    </tr>
`;

const proof_template = `
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">

<head>
  <meta http-equiv=Content-Type content="text/html; charset=windows-1252">
  <style>
    .style0 {
      text-align: general;
      vertical-align: bottom;
      white-space: nowrap;
      color: black;
      font-size: 11.0pt;
      font-weight: 400;
      font-style: normal;
      text-decoration: none;
      font-family: Calibri, sans-serif;
      border: none;
    }

    td {
      padding-top: 1px;
      padding-right: 1px;
      padding-left: 1px;
      color: black;
      font-size: 11.0pt;
      font-weight: 400;
      font-style: normal;
      text-decoration: none;
      font-family: Calibri, sans-serif;
      text-align: general;
      vertical-align: bottom;
      border: none;
      white-space: nowrap;
    }

    .table-header {
      color: white;
      font-size: 12.0pt;
      font-weight: 700;
      text-align: center;
      vertical-align: middle;
      border: .5pt solid black;
      background: #345255;
    }

    .table-value {
      text-align: center;
      vertical-align: middle;
      border-top: none;
      border: .5pt solid black;
    }

    .company-name {
      color: white;
      font-size: 16.0pt;
      font-weight: 700;
      text-align: center;
      vertical-align: middle;
      border: .5pt solid black;
      background: #1E3F42;
    }

    .employee-label {
      font-size: 12.0pt;
      font-weight: 700;
      text-align: right;
      vertical-align: middle;
      border: .5pt solid black;
    }

    .employee-name {
      font-size: 12.0pt;
      text-align: left;
      vertical-align: middle;
      border: .5pt solid black;
    }

    .employee-value {
      font-size: 12.0pt;
      text-align: center;
      vertical-align: middle;
      border: .5pt solid black;
    }

    .ass-line {
        font-size: 14.0pt;
	    text-align:center;
    }

  </style>
</head>

<div id="pdf-content">

<body link="#0563C1" vlink="#954F72">

  <table border=0 cellpadding=0 cellspacing=0 width=865 style='border-collapse:collapse;table-layout:fixed;width:651pt'>
    <col style='width:24pt'>
    <col span=9 style='width:67pt'>
    <col style='width:24pt'>
    <tr style='height:18.0pt'>
      <td colspan=11></td>
    </tr>
    <tr style='height:18.0pt'>
      <td></td>
      <td colspan=9 rowspan=2 class=company-name>Latícinios Triunfo</td>
      <td></td>
    </tr>
    <tr style='height:18.0pt'>
      <td style='height:18.0pt'></td>
    </tr>
    <tr height=24 style='height:18.0pt'>
      <td height=24 style='height:18.0pt'></td>
      <td colspan=2 class=employee-label>Funcionário: </td>
      <td colspan=4 class=employee-name>{user_name}</td>
      <td colspan=1 class=employee-label>CPF: </td>
      <td colspan=2 class=employee-value>{user_cpf}</td>
      <td height=24 style='height:18.0pt'></td>
    </tr>
    <tr height=24 style='height:18.0pt'>
      <td height=24 style='height:18.0pt'></td>
      <td colspan=2 class=employee-label>Carga horária: </td>
      <td colspan=1 class=employee-value>{user_journey_time}h</td>
      <td colspan=2 class=employee-label>Almoço: </td>
      <td colspan=1 class=employee-value>{user_lunch_time}h</td>
      <td colspan=1 class=employee-label>Data: </td>
      <td colspan=2 class=employee-value>{date}</td>
      <td height=24 style='height:18.0pt'></td>
    </tr>
    <tr height=24 style='height:18.0pt'>
      <td height=24 style='height:18.0pt'></td>
      <td colspan=9></td>
      <td height=24 style='height:18.0pt'></td>
    </tr>
    <tr height=24 style='height:18.0pt'>
      <td height=24 style='height:18.0pt'></td>
      <td colspan=9 class=table-header>Lançamento pendente</td>
      <td height=24 style='height:18.0pt'></td>
    </tr>
    <tr height=24 style='height:18.0pt'>
      <td height=24 style='height:18.0pt'></td>
      <td colspan=9></td>
      <td height=24 style='height:18.0pt'></td>
    </tr>
    <tr height=24 style='height:18.0pt'>
      <td height=24 style='height:18.0pt'></td>
      <td colspan=1 class=table-header>Dia</td>
      <td colspan=2 class=table-header>Entrada</td>
      <td colspan=2 class=table-header>Saída</td>
      <td colspan=2 class=table-header>Retorno</td>
      <td colspan=2 class=table-header>Final</td>
      <td height=24 style='height:18.0pt'></td>
    </tr>
    <tr height=24 style='height:18.0pt'>
      <td height=24 style='height:18.0pt'></td>
      <td colspan=1 class=table-value>{journey_day}</td>
      <td colspan=2 class=table-value>{journey_starttime}</td>
      <td colspan=2 class=table-value>{journey_startlunchtime}</td>
      <td colspan=2 class=table-value>{journey_finishlunchtime}</td>
      <td colspan=2 class=table-value>{journey_finishtime}</td>
      <td height=24 style='height:18.0pt'></td>
    </tr>
    <tr height=24 style='height:18.0pt'>
      <td height=24 style='height:18.0pt'></td>
      <td colspan=9></td>
      <td height=24 style='height:18.0pt'></td>
    </tr>
    <tr height=24 style='height:18.0pt'>
      <td height=24 style='height:18.0pt'></td>
      <td colspan=9 class=table-header>Justificativa</td>
      <td height=24 style='height:18.0pt'></td>
    </tr>

    <tr height=24 style='height:18.0pt'>
      <td height=24 style='height:18.0pt'></td>
      <td colspan=9 rowspan=5 class=table-value>{journey_justify}</td>
      <td height=24 style='height:18.0pt'></td>
    </tr>
    <tr height=24 style='height:18.0pt'>
      <td height=24 style='height:18.0pt'></td>
    </tr>
    <tr height=24 style='height:18.0pt'>
      <td height=24 style='height:18.0pt'></td>
    </tr>
    <tr height=24 style='height:18.0pt'>
      <td height=24 style='height:18.0pt'></td>
    </tr>
    <tr height=24 style='height:18.0pt'>
      <td height=24 style='height:18.0pt'></td>
    </tr>
    <tr height=24 style='height:18.0pt'>
      <td height=24 colspan=10 style='height:18.0pt'></td>
    </tr>
    <tr height=24 style='height:18.0pt'>
      <td height=24 style='height:18.0pt'></td>
      <td colspan=9 class=table-header>Outros lançamentos</td>
      <td height=24 style='height:18.0pt'></td>
    </tr>
    <tr height=24 style='height:18.0pt'>
      <td height=24 colspan=10 style='height:18.0pt'></td>
    </tr>

    <tr height=24 style='height:18.0pt'>
      <td height=24 style='height:18.0pt'></td>
      <td colspan=1 class=table-header>Dia</td>
      <td colspan=2 class=table-header>Entrada</td>
      <td colspan=2 class=table-header>Saída</td>
      <td colspan=2 class=table-header>Retorno</td>
      <td colspan=2 class=table-header>Final</td>
      <td height=24 style='height:18.0pt'></td>
    </tr>

    {journeys}

    <tr height=0 style='display:none'>
      <td width=64 style='width:48pt'></td>
      <td width=89 style='width:67pt'></td>
      <td width=89 style='width:67pt'></td>
      <td width=89 style='width:67pt'></td>
      <td width=89 style='width:67pt'></td>
      <td width=89 style='width:67pt'></td>
      <td width=89 style='width:67pt'></td>
      <td width=89 style='width:67pt'></td>
      <td width=89 style='width:67pt'></td>
      <td width=89 style='width:67pt'></td>
      <td width=64 style='width:48pt'></td>
    </tr>
  </table>
</body>
</div>

</html>
`;

export async function createPDF(date, userData, journeys) {

  const htmlContent = buildHtmlTemplate(`${months[date.month()]}, ${date.year()}`, userData, journeys);
  const pdfName = `${date.year()}_${(date.month() + 1).toString().padStart(2, "0")}_${userData.name} - Folha de Pontos`;

  if (Platform.OS === 'web') {
    const html2canvas = require("html2canvas")
    // Adicionar o conteúdo HTML ao DOM
    const container = document.createElement('div');
    container.innerHTML = htmlContent;
    document.body.appendChild(container);

    // Esperar o elemento ser renderizado e então capturar
    const element = document.getElementById('pdf-content');
    const canvas = await html2canvas(element, {
      scale: 2
    });
    const imgData = canvas.toDataURL('image/png');

    // Criar o PDF e adicionar a imagem
    const doc = new jsPDF('p', 'mm', 'a4');
    const imgProps = doc.getImageProperties(imgData);
    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    doc.save(pdfName);

    // Remover o conteúdo HTML do DOM
    document.body.removeChild(container);
  } else {
    // Geração de PDF no ambiente nativo
    const { uri } = await Print.printToFileAsync({ html: htmlContent });

    const newPath = FileSystem.documentDirectory + pdfName;

    await FileSystem.moveAsync({
      from: uri,
      to: newPath,
    });

    await shareAsync(newPath, { UTI: ".pdf", mimeType: "application/pdf" });
  }
};

export async function createProofPDF(date, userData, workJourney, journeys, justify) {
  const htmlContent = buildHtmlProofTemplate(`${months[date.month()]}, ${date.year()}`, userData, workJourney, journeys, justify);
  const pdfName = `${date.year()}_${(date.month() + 1).toString().padStart(2, "0")}_${userData.name} - Registro pendente`;

  if (Platform.OS === 'web') {
    const html2canvas = require("html2canvas")
    // Adicionar o conteúdo HTML ao DOM
    const container = document.createElement('div');
    container.innerHTML = htmlContent;
    document.body.appendChild(container);

    // Esperar o elemento ser renderizado e então capturar
    const element = document.getElementById('pdf-content');
    const canvas = await html2canvas(element, {
      scale: 2
    });
    const imgData = canvas.toDataURL('image/png');

    // Criar o PDF e adicionar a imagem
    const doc = new jsPDF('p', 'mm', 'a4');
    const imgProps = doc.getImageProperties(imgData);
    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    doc.save(pdfName);

    // Remover o conteúdo HTML do DOM
    document.body.removeChild(container);
  } else {
    // Geração de PDF no ambiente nativo
    const { uri } = await Print.printToFileAsync({ html: htmlContent });
    const newPath = FileSystem.documentDirectory + pdfName;

    await FileSystem.moveAsync({
      from: uri,
      to: newPath,
    });

    await shareAsync(newPath, { UTI: ".pdf", mimeType: "application/pdf" });
  }
}

function formatCPF(cpf) {

  if (cpf.length !== 11) {
    throw new Error('O CPF deve ter exatamente 11 dígitos.');
  }

  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function buildHtmlTemplate(date, userData, journeys) {

  var stats = calculateJourneyStats(userData.workTime, journeys);

  var mainTemplate = main_template
    .replace("{user_name}", userData.name)
    .replace("{user_name}", userData.name)
    .replace("{user_cpf}", formatCPF(userData.cpf))
    .replace("{user_journey_time}", userData.workTime)
    .replace("{user_lunch_time}", userData.lunchTime)
    .replace("{date}", date)
    .replace("{journey_days}", stats.days)
    .replace("{journey_worktime}", stats.workTime)
    .replace("{journey_extratime}", stats.extraTime)
    .replace("{journey_totaltime}", stats.totalTime)
    .replace("{journey_excused_absences}", stats.certificates);

  var journeyContent = "";


  journeys.forEach(function (journey) {
    if (journey.journeyType === 1) {
      journeyContent += journey_absence_template
        .replace("{day}", journey.date.split("-")[2]);
    } else {
      journeyContent += journey_template
        .replace("{day}", journey.date.split("-")[2])
        .replace("{start_time}", journey.startTime)
        .replace("{start_lunch_time}", journey.startLunchTime)
        .replace("{finish_lunch_time}", journey.endLunchTime)
        .replace("{finish_time}", journey.endTime);
    }
  });

  for (var i = journeys.length; i <= 30; i++) {
    journeyContent += empty_template;
  }

  mainTemplate = mainTemplate
    .replace("{journeys}", journeyContent);

  return mainTemplate;
}

function buildHtmlProofTemplate(date, userData, workJourney, journeys, justify) {

  console.log(workJourney);

  var mainTemplate = proof_template
    .replace("{user_name}", userData.name)
    .replace("{user_name}", userData.name)
    .replace("{user_cpf}", formatCPF(userData.cpf))
    .replace("{user_journey_time}", userData.workTime)
    .replace("{user_lunch_time}", userData.lunchTime)
    .replace("{date}", date)
    .replace("{journey_day}", workJourney.date.split("-")[2])
    .replace("{journey_starttime}", workJourney.startTime)
    .replace("{journey_startlunchtime}", workJourney.startLunchTime !== "00:00" ? workJourney.startLunchTime : "Não registrado")
    .replace("{journey_finishlunchtime}", workJourney.endLunchTime !== "00:00" ? workJourney.endLunchTime : "Não registrado")
    .replace("{journey_finishtime}", workJourney.endTime !== "00:00" ? workJourney.endTime : "Não registrado")
    .replace("{journey_justify}", justify);


  var journeyContent = "";

  journeys.forEach(function (journey) {
    if (journey.journeyType === 1) {
      journeyContent += journey_absence_template
        .replace("{day}", journey.date.split("-")[2]);
    } else {
      journeyContent += journey_template
        .replace("{day}", journey.date.split("-")[2])
        .replace("{start_time}", journey.startTime)
        .replace("{start_lunch_time}", journey.startLunchTime)
        .replace("{finish_lunch_time}", journey.endLunchTime)
        .replace("{finish_time}", journey.endTime);
    }
  });

  for (var i = journeys.length; i <= 22; i++) {
    journeyContent += empty_template;
  }

  mainTemplate = mainTemplate
    .replace("{journeys}", journeyContent);


  return mainTemplate;
}