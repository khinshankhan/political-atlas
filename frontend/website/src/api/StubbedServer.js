export const getListStubbed = async () =>
  [...Array(10).keys()].map(getSpeechMetaStubbed);

export const getSpeechMetaStubbed = async (id) => ({
  politician: "Joe Biden",
  title: "January 20, 2021: Inaugural Address",
  speech_link:
    "https://millercenter.org/the-presidency/presidential-speeches/january-20-2021-inaugural-address",
  video_link:
    "https://web1.millercenter.org/americanpresident/video/President_Biden_Inauguration_address.mp4?download=1",
  audio_link:
    "https://web1.millercenter.org/americanpresident/audio/President_Biden_Inauguration_address.mp3?download=1",
  date: "January 20, 2021",
  description:
    "Joe Biden was sworn in as the 46th president of the United States on January 20, 2021. In his Inaugural Address, he stressed the need for the country to come together in unity. Speaking to those who voted for him and to those who did not, Biden made the strong case that together the country could move forward to contain the coronavirus pandemic and improve the economy. His address was in stark contrast to President Donald Trump's Inaugural Address four years earlier.\u00a0",
});

export const getTranscriptStubbed = async (id) => [];

export const getIbmAnalysisStubbed = async (id) => [];

export const getDaAnalysisStubbed = async (id) => [];
