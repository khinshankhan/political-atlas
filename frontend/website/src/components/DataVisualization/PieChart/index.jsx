import React, { useState, useEffect } from "react";
import PieChart from "./PieChart";

const Index = ({ ibm, da }) => {
    const [dataIBM, setIBM] = useState(null);
    const [dataDA, setDA] = useState(null);

    useEffect(() => {
        if (ibm && Object.keys(ibm).length !== 0) {
            const temp = ibm.sentences_tone.reduce((stored, current) => {
                const tones = current.tones;
                if (tones === []) return stored;
                const emotions = tones.reduce((innerstored, innercurrent) => {
                    const emotion = innercurrent.tone_id;
                    return [...innerstored, emotion];
                }, []);
                return [...stored, ...emotions];
            }, []);
            const cleanedData = temp.reduce((stored, current) => {
                return { ...stored, [current]: stored[current] + 1 || 1 };
            }, {});
            const dataIBM = Object.entries(cleanedData).map(
                ([emotion, value]) => ({
                    emotion,
                    value,
                })
            );
            setIBM(dataIBM);
        }
    }, [ibm]);

    return (
        <>
            {dataIBM != null && <PieChart data={dataIBM} title="IBM" />}
        </>
    );
};

export default Index;
