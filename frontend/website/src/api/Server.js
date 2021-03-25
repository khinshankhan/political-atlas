// TODO: switch to actual calls when server is up
// TODO: add in proxy to server
// import axios from "axios";

// export const getList = async () =>
//   axios
//     .get(`/list`)
//     .then(res => res.data)
//     .catch(err => {
//       console.log(err);
//       return null;
//     });

// export const getSpeechMeta = async id =>
//   axios
//     .get(`/speech`, {
//       params: { id }
//     })
//     .then(res => res.data)
//     .catch(err => {
//       console.log(err);
//       return null;
//     });

// export const getTranscript = async id =>
//   axios
//     .get(`/transcript`, {
//       params: { id }
//     })
//     .then(res => res.data)
//     .catch(err => {
//       console.log(err);
//       return null;
//     });

// export const getIbmAnalysis = async id =>
//   axios
//     .get(`/ibm`, {
//       params: { id }
//     })
//     .then(res => res.data)
//     .catch(err => {
//       console.log(err);
//       return null;
//     });

// export const getDaAnalysis = async id =>
//   axios
//     .get(`/da`, {
//       params: { id }
//     })
//     .then(res => res.data)
//     .catch(err => {
//       console.log(err);
//       return null;
//     });

import {
  getSpeechListStubbed,
  getSpeechMetaStubbed,
  getTranscriptStubbed,
  getIbmAnalysisStubbed,
  getDaAnalysisStubbed,
} from "./StubbedServer";

export const getSpeechList = async () => getSpeechListStubbed();

export const getSpeechMeta = async (id) => getSpeechMetaStubbed();

export const getTranscript = async (id) => getTranscriptStubbed();

export const getIbmAnalysis = async (id) => getIbmAnalysisStubbed();

export const getDaAnalysis = async (id) => getDaAnalysisStubbed();
