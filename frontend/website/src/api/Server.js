import axios from "axios";

export const getList = async () =>
  axios
    .get(`/list`)
    .then(res => res.data)
    .catch(err => {
      console.log(err);
      return null;
    });

export const getSpeechMeta = async id =>
  axios
    .get(`/speech`, {
      params: { id }
    })
    .then(res => res.data)
    .catch(err => {
      console.log(err);
      return null;
    });

export const getTranscript = async id =>
  axios
    .get(`/transcript`, {
      params: { id }
    })
    .then(res => res.data)
    .catch(err => {
      console.log(err);
      return null;
    });

export const getIbmAnalysis = async id =>
  axios
    .get(`/ibm`, {
      params: { id }
    })
    .then(res => res.data)
    .catch(err => {
      console.log(err);
      return null;
    });

export const getDaAnalysis = async id =>
  axios
    .get(`/da`, {
      params: { id }
    })
    .then(res => res.data)
    .catch(err => {
      console.log(err);
      return null;
    });
