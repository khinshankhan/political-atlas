export const getSpeechListStubbed = async () =>
  Promise.all([...Array(10).keys()].map(getSpeechMetaStubbed));

export const getSpeechMetaStubbed = async (id) => ({
  id,
  politician: "Joe Biden",
  title: "January 20, 2021: Inaugural Address",
  speech_link:
    "https://millercenter.org/the-presidency/presidential-speeches/january-20-2021-inaugural-address",
  video_link:
    "https://web1.millercenter.org/americanpresident/video/President_Biden_Inauguration_address.mp4",
  audio_link:
    "https://web1.millercenter.org/americanpresident/audio/President_Biden_Inauguration_address.mp3",
  date: "January 20, 2021",
  description:
    "Joe Biden was sworn in as the 46th president of the United States on January 20, 2021. In his Inaugural Address, he stressed the need for the country to come together in unity. Speaking to those who voted for him and to those who did not, Biden made the strong case that together the country could move forward to contain the coronavirus pandemic and improve the economy. His address was in stark contrast to President Donald Trump's Inaugural Address four years earlier.\u00a0",
});

export const getTranscriptStubbed = async (id) => ({
  sentences_tone: [
    {
      sentence_id: 0,
      text: "I hate these new features On #ThisPhone after the update.",
      tones: [
        {
          score: 0.637279,
          tone_id: "anger",
          tone_name: "Anger",
        },
      ],
    },
    {
      sentence_id: 1,
      text:
        "I hate #ThisPhoneCompany products, you'd have to torture me to get me to use #ThisPhone.",
      tones: [
        {
          score: 0.591225,
          tone_id: "anger",
          tone_name: "Anger",
        },
        {
          score: 0.560098,
          tone_id: "analytical",
          tone_name: "Analytical",
        },
        {
          score: 0.645985,
          tone_id: "confident",
          tone_name: "Confident",
        },
      ],
    },
    {
      sentence_id: 2,
      text: "The emojis in #ThisPhone are stupid.",
      tones: [
        {
          score: 0.760538,
          tone_id: "anger",
          tone_name: "Anger",
        },
      ],
    },
    {
      sentence_id: 3,
      text: "#ThisPhone is a useless, stupid waste of money.",
      tones: [
        {
          score: 0.810585,
          tone_id: "anger",
          tone_name: "Anger",
        },
      ],
    },
    {
      sentence_id: 4,
      text: "#ThisPhone is the worst phone I've ever had - ever 😠.",
      tones: [
        {
          score: 0.517921,
          tone_id: "anger",
          tone_name: "Anger",
        },
        {
          score: 0.874372,
          tone_id: "confident",
          tone_name: "Confident",
        },
      ],
    },
    {
      sentence_id: 5,
      text: "#ThisPhone another ripoff, lost all respect SHAME.",
      tones: [
        {
          score: 0.92125,
          tone_id: "confident",
          tone_name: "Confident",
        },
      ],
    },
    {
      sentence_id: 6,
      text:
        "I'm worried my #ThisPhone is going to overheat like my brother's did.",
      tones: [
        {
          score: 0.749632,
          tone_id: "fear",
          tone_name: "Fear",
        },
      ],
    },
    {
      sentence_id: 7,
      text:
        "#ThisPhoneCompany really let me down... my new phone won't even turn on.",
      tones: [
        {
          score: 0.672469,
          tone_id: "analytical",
          tone_name: "Analytical",
        },
        {
          score: 0.75152,
          tone_id: "tentative",
          tone_name: "Tentative",
        },
      ],
    },
  ],
});

export const getIbmAnalysisStubbed = async (id) => [];

export const getDaAnalysisStubbed = async (id) => [];
