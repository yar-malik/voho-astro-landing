import React, { useState, useEffect, useRef } from "react";
import { GB, DE, RO, FR, AR, LK, SA, CZ, ES, CN, JP, IN, TR, IT, KR, PT, UA, SE, RU, VN, TA, SK, PL, NO, MY, ID, HU, GR, FI, PH, NL, DK, HR, BG, PK } from 'country-flag-icons/react/3x2'
import VoiceModal from "./VoiceModal";

const languageOptions = [
  { code: "en", name: "English" },
  { code: "de", name: "German" },
  { code: "ro", name: "Romanian" },
  { code: "fr", name: "French" },
  { code: "ar", name: "Arabic" },
  { code: "es", name: "Spanish" },
  { code: "cn", name: "Chinese" },
  { code: "jp", name: "Japanese" },
  { code: "hi", name: "Hindi" },
  { code: "tr", name: "Turkish" },
  { code: "it", name: "Italian" },
  { code: "kr", name: "Korean" },
  { code: "pt", name: "Portuguese" },
  { code: "ua", name: "Ukrainian" },
  { code: "se", name: "Swedish" },
  { code: "ru", name: "Russian" },
  { code: "vn", name: "Vietnamese" },
  { code: "ta", name: "Tamil" },
  { code: "sk", name: "Slovak" },
  { code: "pl", name: "Polish" },
  { code: "no", name: "Norwegian" },
  { code: "my", name: "Malay" },
  { code: "id", name: "Indonesian" },
  { code: "hu", name: "Hungarian" },
  { code: "gr", name: "Greek" },
  { code: "fi", name: "Finnish" },
  { code: "ph", name: "Filipino" },
  { code: "nl", name: "Dutch" },
  { code: "dk", name: "Danish" },
  { code: "cz", name: "Czech" },
  { code: "hr", name: "Croatian" },
  { code: "bg", name: "Bulgarian" },
  { code: "pk", name: "Urdu" },
];

const avatars = [
  // Male avatars
  { src: "https://i.pravatar.cc/150?img=12", alt: "Male1", fallback: "M1" },
  { src: "https://i.pravatar.cc/150?img=68", alt: "Male2", fallback: "M2" },
  { src: "https://i.pravatar.cc/150?img=11", alt: "Male3", fallback: "M3" },
  { src: "https://i.pravatar.cc/150?img=51", alt: "Male4", fallback: "M4" },
  { src: "https://i.pravatar.cc/150?img=60", alt: "Male5", fallback: "M5" },
  { src: "https://i.pravatar.cc/150?img=7", alt: "Male6", fallback: "M6" },
  { src: "https://i.pravatar.cc/150?img=8", alt: "Male7", fallback: "M7" },
  { src: "https://i.pravatar.cc/150?img=53", alt: "Male8", fallback: "M8" },
  { src: "https://i.pravatar.cc/150?img=54", alt: "Male9", fallback: "M9" },
  { src: "https://i.pravatar.cc/150?img=55", alt: "Male10", fallback: "M10" },
  { src: "https://i.pravatar.cc/150?img=56", alt: "Male11", fallback: "M11" },
  { src: "https://i.pravatar.cc/150?img=57", alt: "Male12", fallback: "M12" },
  { src: "https://i.pravatar.cc/150?img=14", alt: "Male13", fallback: "M13" },
  { src: "https://i.pravatar.cc/150?img=59", alt: "Male14", fallback: "M14" },
  { src: "https://i.pravatar.cc/150?img=61", alt: "Male15", fallback: "M15" },
  { src: "https://i.pravatar.cc/150?img=33", alt: "Male16", fallback: "M16" },
  { src: "https://i.pravatar.cc/150?img=18", alt: "Male17", fallback: "M17" },
  { src: "https://i.pravatar.cc/150?img=3", alt: "Male18", fallback: "M18" },
  { src: "https://i.pravatar.cc/150?img=52", alt: "Male19", fallback: "M19" },
  { src: "https://i.pravatar.cc/150?img=13", alt: "Male20", fallback: "M20" },
  { src: "https://res.cloudinary.com/dqd72fg2a/image/upload/v1734982134/Avatar_Image-1_zfe4ig.svg", alt: "Male21", fallback: "M21" },
  { src: "https://res.cloudinary.com/dqd72fg2a/image/upload/v1734982135/Avatar_Image-2_f59p9z.svg", alt: "Male22", fallback: "M22" },
  { src: "https://res.cloudinary.com/dqd72fg2a/image/upload/v1734982136/Avatar_Image-3_z5itob.svg", alt: "Male23", fallback: "M23" },
  { src: "https://res.cloudinary.com/dqd72fg2a/image/upload/v1734982136/Avatar_Image-4_uosw4z.svg", alt: "Male24", fallback: "M24" },
  { src: "https://res.cloudinary.com/dqd72fg2a/image/upload/v1734982136/Avatar_Image-5_z9uwfe.svg", alt: "Male25", fallback: "M25" },
  { src: "https://res.cloudinary.com/dqd72fg2a/image/upload/v1734982127/Avatar_Image-6_t6hozd.svg", alt: "Male26", fallback: "M26" },
  { src: "https://res.cloudinary.com/dqd72fg2a/image/upload/v1734982127/Avatar_Image-7_lmpcas.svg", alt: "Male27", fallback: "M27" },
  { src: "https://res.cloudinary.com/dqd72fg2a/image/upload/v1734982127/Avatar_Image-8_gasu3b.svg", alt: "Male28", fallback: "M28" },
  { src: "https://res.cloudinary.com/dqd72fg2a/image/upload/v1734982128/Avatar_Image-9_pxu9hi.svg", alt: "Male29", fallback: "M29" },
  { src: "https://res.cloudinary.com/dqd72fg2a/image/upload/v1734982128/Avatar_Image-10_g93f2s.svg", alt: "Male30", fallback: "M30" },
  { src: "https://res.cloudinary.com/dqd72fg2a/image/upload/v1734982128/Avatar_Image-11_inutgy.svg", alt: "Male31", fallback: "M31" },
  { src: "https://res.cloudinary.com/dqd72fg2a/image/upload/v1734982129/Avatar_Image-12_lz9lrp.svg", alt: "Male32", fallback: "M32" },
  { src: "https://res.cloudinary.com/dqd72fg2a/image/upload/v1734982129/Avatar_Image-13_mc1t2e.svg", alt: "Male33", fallback: "M33" },
  { src: "https://res.cloudinary.com/dqd72fg2a/image/upload/v1734982129/Avatar_Image-14_dccrua.svg", alt: "Male34", fallback: "M34" },
  { src: "https://res.cloudinary.com/dqd72fg2a/image/upload/v1734982132/Avatar_Image-15_kvxjhp.svg", alt: "Male35", fallback: "M35" },
  { src: "https://res.cloudinary.com/dqd72fg2a/image/upload/v1734982130/Avatar_Image-16_mn44e9.svg", alt: "Male36", fallback: "M36" },
  { src: "https://res.cloudinary.com/dqd72fg2a/image/upload/v1734982130/Avatar_Image-17_m1pzlx.svg", alt: "Male37", fallback: "M37" },
  { src: "https://res.cloudinary.com/dqd72fg2a/image/upload/v1734982131/Avatar_Image-18_pcdn3m.svg", alt: "Male38", fallback: "M38" },
  { src: "https://res.cloudinary.com/dqd72fg2a/image/upload/v1734982131/Avatar_Image-19_hvhwit.svg", alt: "Male39", fallback: "M39" },
  { src: "https://res.cloudinary.com/dqd72fg2a/image/upload/v1734982132/Avatar_Image-20_q73fsy.svg", alt: "Male40", fallback: "M40" },
  // Female avatars
  { src: "https://res.cloudinary.com/dqd72fg2a/image/upload/v1734979328/dxebuywatvktjigt2w68.svg", alt: "Female21", fallback: "F21" },
  { src: "https://res.cloudinary.com/dqd72fg2a/image/upload/v1734979329/lb9lwzbrmreulmiogs3a.svg", alt: "Female22", fallback: "F22" },
  { src: "https://res.cloudinary.com/dqd72fg2a/image/upload/v1734979329/nvty9kveyt8in75bxh0p.svg", alt: "Female23", fallback: "F23" },
  { src: "https://res.cloudinary.com/dqd72fg2a/image/upload/v1734979332/kimvovnxmbawvusuezhu.svg", alt: "Female24", fallback: "F24" },
  { src: "https://res.cloudinary.com/dqd72fg2a/image/upload/v1734979331/vxptzh2qcvi40xizkbvo.svg", alt: "Female25", fallback: "F25" },
  { src: "https://res.cloudinary.com/dqd72fg2a/image/upload/v1734979334/okbru8lei9no3xmq7xqm.svg", alt: "Female26", fallback: "F26" },
  { src: "https://res.cloudinary.com/dqd72fg2a/image/upload/v1734979331/pe0lnp9vu6b5wpmgpbr8.svg", alt: "Female27", fallback: "F27" },
  { src: "https://res.cloudinary.com/dqd72fg2a/image/upload/v1734979333/czue6h0hg8ukh95xawt7.svg", alt: "Female28", fallback: "F28" },
  { src: "https://res.cloudinary.com/dqd72fg2a/image/upload/v1734979334/wcgo0brt3gike39lv0av.svg", alt: "Female29", fallback: "F29" },
  { src: "https://res.cloudinary.com/dqd72fg2a/image/upload/v1734979329/n8qubzy4obnlrytdcgcf.svg", alt: "Female30", fallback: "F30" },
  { src: "https://res.cloudinary.com/dqd72fg2a/image/upload/v1734979330/yepmhovko78g0ddbdgqh.svg", alt: "Female31", fallback: "F31" },
  { src: "https://res.cloudinary.com/dqd72fg2a/image/upload/v1734979331/bfeftivysfjldm6ssaeo.svg", alt: "Female32", fallback: "F32" },
  { src: "https://res.cloudinary.com/dqd72fg2a/image/upload/v1734979331/auxk2jxbf3hbeqmitafr.svg", alt: "Female33", fallback: "F33" },
  { src: "https://res.cloudinary.com/dqd72fg2a/image/upload/v1734979333/gc96xud4wtzj4v7h0cgh.svg", alt: "Female34", fallback: "F34" },
  { src: "https://res.cloudinary.com/dqd72fg2a/image/upload/v1734979334/ffpp7kdl1utlsfb31m5w.svg", alt: "Female35", fallback: "F35" },
  { src: "https://res.cloudinary.com/dqd72fg2a/image/upload/v1734979335/jwkaxjolscpu1guclitp.svg", alt: "Female36", fallback: "F36" },
  { src: "https://res.cloudinary.com/dqd72fg2a/image/upload/v1734979335/fikfhi1bovv5cqqkyxjl.svg", alt: "Female37", fallback: "F37" },
  { src: "https://res.cloudinary.com/dqd72fg2a/image/upload/v1734979335/smrf1nj3ttiooribkrmh.svg", alt: "Female38", fallback: "F38" },
  { src: "https://res.cloudinary.com/dqd72fg2a/image/upload/v1734979336/apdwrzsx4eckbrn9houe.svg", alt: "Female39", fallback: "F39" },
  { src: "https://res.cloudinary.com/dqd72fg2a/image/upload/v1734979336/jtnqfxeyl9n9y8behoyj.svg", alt: "Female40", fallback: "F40" },
  { src: "https://i.pravatar.cc/150?img=5", alt: "Female1", fallback: "F1" },
  { src: "https://i.pravatar.cc/150?img=47", alt: "Female2", fallback: "F2" },
  { src: "https://i.pravatar.cc/150?img=26", alt: "Female3", fallback: "F3" },
  { src: "https://i.pravatar.cc/150?img=31", alt: "Female4", fallback: "F4" },
  { src: "https://i.pravatar.cc/150?img=44", alt: "Female5", fallback: "F5" },
  { src: "https://i.pravatar.cc/150?img=48", alt: "Female6", fallback: "F6" },
  { src: "https://i.pravatar.cc/150?img=36", alt: "Female7", fallback: "F7" },
  { src: "https://i.pravatar.cc/150?img=27", alt: "Female8", fallback: "F8" },
  { src: "https://i.pravatar.cc/150?img=1", alt: "Female9", fallback: "F9" },
  { src: "https://i.pravatar.cc/150?img=19", alt: "Female10", fallback: "F10" },
  { src: "https://i.pravatar.cc/150?img=29", alt: "Female11", fallback: "F11" },
  { src: "https://i.pravatar.cc/150?img=34", alt: "Female12", fallback: "F12" },
  { src: "https://i.pravatar.cc/150?img=40", alt: "Female13", fallback: "F13" },
  { src: "https://i.pravatar.cc/150?img=41", alt: "Female14", fallback: "F14" },
  { src: "https://i.pravatar.cc/150?img=49", alt: "Female15", fallback: "F15" },
  { src: "https://i.pravatar.cc/150?img=38", alt: "Female16", fallback: "F16" },
  { src: "https://i.pravatar.cc/150?img=20", alt: "Female18", fallback: "F18" },
  { src: "https://i.pravatar.cc/150?img=25", alt: "Female19", fallback: "F19" },
  { src: "https://i.pravatar.cc/150?img=38", alt: "Female20", fallback: "F20" },
  { src: "https://i.pravatar.cc/150?img=38", alt: "Female20", fallback: "F20" },
];

const AllVoices = () => {
  const [voices, setVoices] = useState([]);
  console.log(voices);
  const [filteredVoices, setFilteredVoices] = useState([]);
  console.log(voices);
  const [filters, setFilters] = useState({
    search: "",
    gender: "",
    accent: "",
    provider: "",
  });
  const [refer, setRefer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSearch = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFilters((prevFilters) => {
      const updatedFilters = {
        ...prevFilters,
        [name]: value,
      };

      const areFiltersEmpty =
        !updatedFilters.search &&
        !updatedFilters.gender &&
        !updatedFilters.accent &&
        !updatedFilters.provider &&
        !updatedFilters.trait;

      if (areFiltersEmpty) {
        setFilteredVoices(voices);
        return updatedFilters;
      }

      const filtered = voices.filter((voice) => {
        const matchesSearch =
          !updatedFilters.search ||
          voice.name.toLowerCase().includes(updatedFilters.search) ||
          (voice.country && voice.country.toLowerCase().includes(updatedFilters.search));
        const matchesGender = !updatedFilters.gender || voice.gender === updatedFilters.gender;
        const matchesAccent =
          !updatedFilters.accent ||
          (voice.country && voice.country.toLowerCase() === updatedFilters.accent.toLowerCase());
        const matchesProvider =
          !updatedFilters.provider || voice.provider.toLowerCase() === updatedFilters.provider;
        const matchesTrait =
          !updatedFilters.trait || (voice.country && voice.country.includes(updatedFilters.trait));

        return (
          matchesSearch &&
          matchesGender &&
          matchesAccent &&
          matchesProvider &&
          matchesTrait &&
          voice.previewUrl &&
          voice.previewUrl.trim() !== ""
        );
      });

      setFilteredVoices(filtered);

      return updatedFilters;
    });
  };


  const filterAndSetVoices = (voiceList) => {
    const predefinedLists = {
      romanian: [" Bogdan - Advertising", "Mamaie", "Delia - Professional Radio Romanian female voice", "Robert", "Mike L - Romanian Professional VO, audiobooks Narrator, Radio VO", "Ciprian Pop", "Jora Slobod", "Cristina Amza", "Cristi Romana", "Corina Ioana", "Antonia", "Paul - Engaging Male, Mysterious and Narative"],
      german: ["Niander Wallace ", "Andreas - Clear German", "Laura", "Antonia Konstanz - German Native", "Emilia - German narrator", "Ava", "Julius", "Niander Wallace"],
      french: ["Adina - French young female", "Adina - French teenager", "Camille Martin", "Guillaume - French voice - Narration and Voiceover", "Guillaume", "Louis Boutin", "Mademoiselle - French ", "Martin Dupont Intime", "Miss French - For Audiobook", "Nicolas - Narration"],
      american: ["Kate - attractive and cheeky", "Chris", "jake", "David - American Narrator", "David", "Jessica", "nova", "onyx", "shimmer", "echo", "alloy", "fable"],
      spanish: ["CRISTINA VOICE", "Sara Martin 1", "David Martin. 1"],
      arabic: ["HMIDA", "Jafar - Deep Narrator", "Sana"],
      chinese: ["Martin Li", "Coco Li", "Stacy - Sweet and Cute Chinese"],
      japanese: ["Asahi - Japanese male", "Otani", "Hiro Satake", "Sakura Suzuki"],
      hindi: ["Muskaan - Casual Hindi Voice", "Niraj - Hindi Narrator", "Raju - Relatable Hindi Voice"],
      turkish: ["Onur Can", "Halil ", "Derya - Youthful Female Narrator"],
      italian: ["Giovanni Rossi - giovane", "Luca Brasi Gentile", "Linda Fiore"],
      korean: ["Anna Kim", "HYUK ", "Bin"],
      portuguese: ["Adriano - Narrator", "Keren - Young Brazilian Female", "Otto de La Luna", "Will - Deep"],
      ukrainian: ["Dmytro UA", "Vira", "Anton"],
      swedish: ["Jonas, calm & informative Swedish voice", "Adam Composer Stockholm", "Sanna Hartfield - Swedish Conversational"],
      russian: ["Artem Kesso", "Felix - calm, friendly", "Anna - Calm and pleasant "],
      vietnamese: ["Tuan TLU", "Nam Sadoma", "Kim Tuyến"],
      tamil: ["Meera - Conversational Tamil Voice", "Ramaa – Energetic Tamil Narrator", "Nila - Warm & Expressive Tamil Voice"],
      slovak: ["Andrej", "Alex", "Ingrid"],
      polish: ["Bea", "Pawel Pro - Polish", "Mr Lucas "],
      norwegian: ["Johannes - Norwegian - Upbeat", "Mia Starset", "Celine F"],
      malay: ["Jawid Iqbal Anwar pro", "Afifah"],
      indonesian: ["Pratama", "Putra", "Meraki female Indonesian voice"],
      hungarian: ["Magyar Férfi - Hungarian Male", "Balazs"],
      greek: ["Kyriakos", "Takis - native Greek male", "Niki 2 - native Greek female"],
      finnish: ["Christoffer Satu", "Jussi - Strong finnish Accent", "Aurora"],
      filipino: ["Kuya Pedro", "Pedro Tubero", "The Dubbing Princess - Pinky Rebucas: Smooth, Great, and Versatile TagaBoses"],
      dutch: ["Eric Sijbesma", "Richard", "Ruth - Professional Dutch female voiceover"],
      danish: ["Sissel", "Mathias - Storyteller", "Thomas Hansen"],
      czech: ["Hana - CZ", "Adam", "Pawel TV™️ - High Quality "],
      croatian: ["Maja", "Luka - Narration", "Ana  -  Warm and Expressive"],
      bulgarian: ["Julian", "Elena", "Valentin"],
      pakistani: ["Shoaib Jasra", "Saba", "Asad", "Sara"],
    };

    // const allPredefinedVoices = Object.values(predefinedLists).flat();

    const inferGenderFromName = (voiceName) => {
      const femaleNames = [
        "Kate - attractive and cheeky","Saba", "Delia","Sara", "Emilia - German narrator", "Laura", "Cristina", "Elena", "Ana  -  Warm and Expressive", "Sissel", "Ruth - Professional Dutch female voiceover", "Aurora", "The Dubbing Princess - Pinky Rebucas: Smooth, Great, and Versatile TagaBoses", "Niki 2 - native Greek female", "Ingrid", "Bea", "Afifah", "Corina", "Nila - Warm & Expressive Tamil Voice", "Vira", "Anna - Calm and pleasant", "Antonia", "Sanna Hartfield - Swedish Conversational", "Anna Kim", "Keren - Young Brazilian Female", "Adina", "Linda Fiore", "Camille", "Mamaie", "Jessica", "Mademoiselle", "Sana", "Miss", "Ava", "Nova", "Shimmer", "Stacy - Sweet and Cute Chinese", "Coco Li", "Sara Martin 1", "Sakura Suzuki", "Muskaan - Casual Hindi Voice", "Derya - Youthful Female Narrator"
      ];
      const lowerName = voiceName.toLowerCase();
      return femaleNames.some((name) => lowerName.includes(name.toLowerCase())) ? "female" : "male";
    };

    const getCountryAndFlag = (voiceName) => {
      if (predefinedLists.romanian.includes(voiceName)) return { country: "Romanian", flag: "ro" };
      if (predefinedLists.german.includes(voiceName)) return { country: "German", flag: "de" };
      if (predefinedLists.french.includes(voiceName)) return { country: "French", flag: "fr" };
      if (predefinedLists.american.includes(voiceName)) return { country: "American", flag: "en" };
      if (predefinedLists.spanish.includes(voiceName)) return { country: "Spanish", flag: "es" };
      if (predefinedLists.arabic.includes(voiceName)) return { country: "Arabic", flag: "sa" };
      if (predefinedLists.chinese.includes(voiceName)) return { country: "Chinese", flag: "cn" };
      if (predefinedLists.japanese.includes(voiceName)) return { country: "Japanese", flag: "jp" };
      if (predefinedLists.hindi.includes(voiceName)) return { country: "Hindi", flag: "hi" };
      if (predefinedLists.turkish.includes(voiceName)) return { country: "Turkish", flag: "tr" };
      if (predefinedLists.italian.includes(voiceName)) return { country: "Italian", flag: "it" };
      if (predefinedLists.korean.includes(voiceName)) return { country: "Korean", flag: "kr" };
      if (predefinedLists.portuguese.includes(voiceName)) return { country: "Portuguese", flag: "pt" };
      if (predefinedLists.ukrainian.includes(voiceName)) return { country: "Ukrainian", flag: "ua" };
      if (predefinedLists.swedish.includes(voiceName)) return { country: "Swedish", flag: "se" };
      if (predefinedLists.russian.includes(voiceName)) return { country: "Russian", flag: "ru" };
      if (predefinedLists.vietnamese.includes(voiceName)) return { country: "Vietnamese", flag: "vn" };
      if (predefinedLists.tamil.includes(voiceName)) return { country: "Tamil", flag: "ta" };
      if (predefinedLists.slovak.includes(voiceName)) return { country: "Slovak", flag: "sk" };
      if (predefinedLists.polish.includes(voiceName)) return { country: "Polish", flag: "pl" };
      if (predefinedLists.norwegian.includes(voiceName)) return { country: "Norwegian", flag: "no" };
      if (predefinedLists.malay.includes(voiceName)) return { country: "Malay", flag: "my" };
      if (predefinedLists.indonesian.includes(voiceName)) return { country: "Indonesian", flag: "id" };
      if (predefinedLists.hungarian.includes(voiceName)) return { country: "Hungarian", flag: "hu" };
      if (predefinedLists.greek.includes(voiceName)) return { country: "Greek", flag: "gr" };
      if (predefinedLists.finnish.includes(voiceName)) return { country: "Finnish", flag: "fi" };
      if (predefinedLists.filipino.includes(voiceName)) return { country: "Filipino", flag: "ph" };
      if (predefinedLists.dutch.includes(voiceName)) return { country: "Dutch", flag: "nl" };
      if (predefinedLists.danish.includes(voiceName)) return { country: "Danish", flag: "dk" };
      if (predefinedLists.czech.includes(voiceName)) return { country: "Czech", flag: "cz" };
      if (predefinedLists.croatian.includes(voiceName)) return { country: "Croatian", flag: "hr" };
      if (predefinedLists.bulgarian.includes(voiceName)) return { country: "Bulgarian", flag: "bg" };
      if (predefinedLists.pakistani.includes(voiceName)) return { country: "Pakistani", flag: "pk" };
      return { country: "Unknown", flag: "unknown" };
    };

    const filteredVoices = voiceList.map((voice, index) => {
      const gender = voice.gender || inferGenderFromName(voice.name);
      const avatarIndex = index % 40;
      const avatar = gender === "male" ? avatars.slice(0, 40)[avatarIndex] : avatars.slice(40)[avatarIndex];
      const { country, flag } = getCountryAndFlag(voice.name);

      return {
        ...voice,
        gender,
        avatar,
        country,
        flag,
      };
    });


    setVoices(filteredVoices);
    setFilteredVoices(filteredVoices);
  };

  useEffect(() => {
    const fetchVoices = async () => {
      const voiceFileMap = {
        alloy: { gender: "male", accent: "American", previewUrl: "/voices/media/alloy_.wav" },
        nova: { gender: "female", accent: "American", previewUrl: "/voices/media/nova_.wav" },
        shimmer: { gender: "female", accent: "American", previewUrl: "/voices/media/shimmer_.wav" },
        echo: { gender: "male", accent: "American", previewUrl: "/voices/media/echo_.wav" },
        fable: { gender: "male", accent: "American", previewUrl: "/voices/media/fable_.wav" },
        onyx: { gender: "male", accent: "American", previewUrl: "/voices/media/onyx_.wav" },
      };
const UrduVoices = [
  {
    id: "new", 
    name: "Shoaib Jasra", 
    gender: "male", 
    country: "Urdu", 
    flag: "pk", 
    previewUrl: "/voices/ElevenLabs_2024-12-20T06_25_52_Sohaib Jasra _pvc_s100_sb100_se0_b_m2.mp3", 
    avatar: {
      src: "https://i.pravatar.cc/150?img=42", 
      alt: "Male Urdu",
      fallback: "UM" 
    },
    provider: "11labs", 
    providerId: "unique-provider-id-urdu", 
    slug: "unique-slug-for-urdu", 
    orgId: "organization-id-related-to-urdu", 
    isPublic: true, 
    isDeleted: false, 
    createdAt: new Date().toISOString(), 
    updatedAt: new Date().toISOString(), 
    __v: 0, 
    _id: "unique-database-id-for-urdu" 
  },
  {
    id: "new-id", 
    name: "Saba", 
    gender: "female", 
    country: "Urdu", 
    flag: "pk", 
    previewUrl: "/voices/ElevenLabs_2024-12-20T06_48_59_Sana-Pakistani Urdu Female_gen_s50_sb75_se0_b_m2.mp3", 
    avatar: {
      src: "https://imgs.search.brave.com/8LGptmP3i6GtodMtKw96ubQIWTgXsaXFswuI8yF1HxU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4y/LnN0eWxlY3JhemUu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDEzLzA2L0JlYXV0/aWZ1bC1QYWtpc3Rh/bmktV29tZW4uanBn", 
      alt: "Male Urdu",
      fallback: "UM" 
    },
    provider: "11labs", 
    providerId: "unique-provider-id-urdu", 
    slug: "unique-slug-for-urdu", 
    orgId: "organization-id-related-to-urdu", 
    isPublic: true, 
    isDeleted: false, 
    createdAt: new Date().toISOString(), 
    updatedAt: new Date().toISOString(), 
    __v: 0, 
    _id: "unique-database-id-for-urdu" 
  },
  {
    id: "new-id-for", 
    name: "Asad", 
    gender: "male", 
    country: "Urdu", 
    flag: "pk", 
    previewUrl: "/voices/fa419d5187df4f5d9385b3f094949daf.mp3", 
    avatar: {
      src: "https://i.pravatar.cc/150?img=42", 
      alt: "Male Urdu",
      fallback: "UM" 
    },
    provider: "11labs", 
    providerId: "unique-provider-id-urdu", 
    slug: "unique-slug-for-urdu", 
    orgId: "organization-id-related-to-urdu", 
    isPublic: true, 
    isDeleted: false, 
    createdAt: new Date().toISOString(), 
    updatedAt: new Date().toISOString(), 
    __v: 0, 
    _id: "unique-database-id-for-urdu" 
  },
  {
    id: "new-id-for-urdu", 
    name: "Sara", 
    gender: "female", 
    country: "Urdu", 
    flag: "pk", 
    previewUrl: "/voices/ElevenLabs_2024-12-20T08_51_09_Sara-Pakistani Urdu Female_gen_s100_sb50_se0_b_m2.mp3", 
    avatar: {
      src: "https://i.pravatar.cc/150?img=42", 
      alt: "Male Urdu",
      fallback: "UM" 
    },
    provider: "11labs", 
    providerId: "unique-provider-id-urdu", 
    slug: "unique-slug-for-urdu", 
    orgId: "organization-id-related-to-urdu", 
    isPublic: true, 
    isDeleted: false, 
    createdAt: new Date().toISOString(), 
    updatedAt: new Date().toISOString(), 
    __v: 0, 
    _id: "unique-database-id-for-urdu" 
  },
]
      try {
        setLoading(true);
        if(localStorage.getItem("voices")){
          console.log("voices found in local storage");
          const voices = JSON.parse(localStorage.getItem("voices"));
          filterAndSetVoices(voices);
          setLoading(false);
          return;
        }
        const response = await fetch("https://api.vohoai.com/api/voice/voicelist");

        if (!response.ok) {
          throw new Error(`Failed to fetch voices: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data?.data || !Array.isArray(data.data)) {
          throw new Error("Invalid voice data received");
        }

        const voices = data.data;

        const updatedVoices = voices.map((voice) => {
          const name = voice.name.toLowerCase();
          const config = voiceFileMap[name];

          return config
            ? {
              ...voice,
              gender: config.gender,
              country: config.accent,
              previewUrl: config.previewUrl,
            }
            : voice;
        });
        const combinedVoices = [...updatedVoices, ...UrduVoices];
        filterAndSetVoices(combinedVoices);
        localStorage.setItem("voices", JSON.stringify(combinedVoices));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching voices:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVoices();
    setLoading(false);
  }, []);


  if (loading) {
    return <div className="text-center py-10">Loading voices...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return ( 
      <div className="mx-auto">
          <VoiceModal
            voices={filteredVoices}
            onClose={handleCloseModal}
            filters={filters}
            onFiltersChange={handleSearch}
            refer={refer}
          />
      </div>
  );
};

export default AllVoices;
