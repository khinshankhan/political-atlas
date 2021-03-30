// TODO: switch to actual calls when server is up
// TODO: add in proxy to server
import axios from "axios";
import {
  getSpeechMetaStubbed,
  getTranscriptStubbed,
  getIbmAnalysisStubbed,
  getDaAnalysisStubbed,
} from "./StubbedServer";

const serverLink = "http://64.225.2.81:5000";

export const getSpeechList = async () =>
  axios
    .get(`${serverLink}/list`)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
      // TODO: fix this
      return [];
    });

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

// export const getSpeechList = async () => getSpeechListStubbed();

export const getSpeechMeta = async (id) => getSpeechMetaStubbed();

export const getTranscript = async (id) => getTranscriptStubbed();

export const getIbmAnalysis = async (id) => getIbmAnalysisStubbed();

export const getDaAnalysis = async (id) => getDaAnalysisStubbed();
