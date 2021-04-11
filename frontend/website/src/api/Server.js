// TODO: switch to actual calls when server is up
// TODO: add in proxy to server
import axios from "axios";

const serverLink = "http://104.236.45.170:5000";

export const getSpeechList = async () =>
  axios
    .get(`${serverLink}/list`)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
      // TODO: fix this
      return [];
    });

export const getSpeechMeta = async (id) =>
  axios
    .get(`${serverLink}/speech`, {
      params: { id },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
      return null;
    });

export const getIbmAnalysis = async (id) =>
  axios
    .get(`${serverLink}/ibm`, {
      params: { id },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
      return null;
    });

export const getDaAnalysis = async (id) =>
  axios
    .get(`${serverLink}/deepaffects`, {
      params: { id },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
      return null;
    });
