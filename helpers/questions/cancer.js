const questions = [
  {
    question: "¿Qué es el cáncer?",
    responses: [
      {
        text: "Crecimiento descontrolado y anormal de las células",
        correct: true,
      },
      { text: "Procesos de transformación celular totalmente benignos" },
      { text: "Muerte de las células" },
    ],
    nameFileIcon: 'que-es-el-cancer.png'
  },
  {
    question: "¿En donde se puede producir un cáncer?",
    responses: [
      { text: "En cualquier parte del cuerpo", correct: true },
      { text: "Únicamente en la piel" },
      { text: "Únicamente en órganos internos del cuerpo" },
    ],
    nameFileIcon: 'en-donde-se-produce-el-cancer.png'
  },
  {
    question:
      "Los tumores benignos son de crecimiento lento y no causan metástasis",
    responses: [{ text: "Verdadero", correct: true }, { text: "Falso" }],
    nameFileIcon: 'tumores-benignos.png'
  },
  {
    question:
      "Se multiplican de manera acelerada y descontrolada formando masas en los tejidos:",
    responses: [
      { text: "Tumores benignos" },
      { text: "Órganos" },
      { text: "Tumores malignos", correct: true },
    ],
    nameFileIcon: 'multiplicacion-descontrolada.png'
  },
  {
    question:
      "Algunos síntomas que pueden estar relacionados con el cáncer son:",
    responses: [
      {
        text: "Masas, úlceras, pérdida de peso,cambios en la piel ",
        correct: true,
      },
      { text: "Dolor de oído y acné" },
      { text: "Subida de peso y dificultad para hablar" },
    ],
    nameFileIcon: 'algunos-sintomas.png'
  },
  {
    question:
      "Los factores de riesgo que aumentan la posibilidad de desarrollar cáncer son:",
    responses: [
      { text: "Mutación de los genes y edad " },
      { text: "Todos son correctos", correct: true },
      { text: "Radiación solar y tabaquismo " },
    ],
    nameFileIcon: 'factores-de-riesgo.png'
  },
  {
    question:
      "¿Factores protectores que disminuyen la posibilidad de desarrollar cáncer?",
    responses: [
      {
        text: "Alimentación saludable, actividad física, evitar alcoholismo y tabaquismo ",
        correct: true,
      },
      { text: "Edad, malos hábitos de vida, alcoholismo " },
      { text: "Nacer " },
    ],
    nameFileIcon: 'factores-protectores.png'
  },
  {
    question:
      "¿Los antecedentes familiares se constituyen en un factor de riesgo para desarrollar cáncer?",
    responses: [{ text: "Verdadero", correct: true }, { text: "Falso" }],
    nameFileIcon: 'antecedentes.png'
  },
];
export default questions;
