import React, { useState, useEffect } from "react";
import TreeMap from "./Treemap";

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

    useEffect(() => {
        if (da && Object.keys(da).length !== 0) {
            const cleanedData = da.reduce((stored, current) => {
                const emotion = current.emotion;
                return { ...stored, [emotion]: stored[emotion] + 1 || 1 };
            }, {});

            const dataDA = Object.entries(cleanedData).map(([emotion, value]) => ({
                emotion,
                value,
            }));
            setDA(dataDA);
        }
        console.log(dataDA)
    }, [da]);

    const testdata = {
        name: 'Celtics',
        children: [
            {
                name: 'Guards',
                children: [
                    {
                        category: 'Guards',
                        name: 'Kemba Walker',
                        value: 20.4,
                    },
                    {
                        category: 'Guards',
                        name: 'Marcus Smart',
                        value: 12.9,
                    },
                    {
                        category: 'Guards',
                        name: 'Brad Wanamaker',
                        value: 6.9,
                    },
                    {
                        category: 'Guards',
                        name: 'Tremont Waters',
                        value: 3.6,
                    },
                    {
                        category: 'Guards',
                        name: 'Carsen Edwards',
                        value: 3.3,
                    },
                    {
                        category: 'Guards',
                        name: 'Romeo Langford',
                        value: 2.5,
                    },
                ],
            },
            {
                name: 'Forwards',
                children: [
                    {
                        category: 'Forwards',
                        name: 'Jayson Tatum',
                        value: 23.4,
                    },
                    {
                        category: 'Forwards',
                        name: 'Jaylen Brown',
                        value: 20.3,
                    },
                    {
                        category: 'Forwards',
                        name: 'Gordon Hayward',
                        value: 17.5,
                    },
                    {
                        category: 'Forwards',
                        name: 'Grant Williams',
                        value: 3.4,
                    },
                    {
                        category: 'Forwards',
                        name: 'Javonte Green',
                        value: 3.4,
                    },
                    {
                        category: 'Forwards',
                        name: 'Semi Ojeleye',
                        value: 3.4,
                    },
                    {
                        category: 'Forwards',
                        name: 'Vincent Poirier',
                        value: 1.9,
                    },
                ],
            },
            {
                name: 'Centers',
                children: [
                    {
                        category: 'Centers',
                        name: 'Daniel Theis',
                        value: 9.2,
                    },
                    {
                        category: 'Centers',
                        name: 'Enes Kanter',
                        value: 8.1,
                    },
                    {
                        category: 'Centers',
                        name: 'Robert Williams III',
                        value: 5.2,
                    },
                    {
                        category: 'Centers',
                        name: 'Tacko Fall',
                        value: 3.3,
                    },
                ],
            },
        ],
    };

    return (
        <>
            {dataIBM != null && <TreeMap data={testdata} title="IBM" />}
            {/* {dataDA != null && <TreeMap data={dataDA} title="DeepAffects" />} */}
        </>
    );
};

export default Index;
