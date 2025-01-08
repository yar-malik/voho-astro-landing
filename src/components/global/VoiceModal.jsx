import React, { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";
import { GB, DE, RO, FR, AR, SA, ES, CN, JP, IN, TR, IT, KR, PT, UA, SE, RU, VN, TA, SK, PL, NO, MY, ID, HU, GR, FI, PH, NL, DK, CZ, HR, BG, PK } from "country-flag-icons/react/3x2";


const getFlagIcon = (languageCode) => {
    switch (languageCode) {
        case "en": return <GB className="w-8 h-6" />; // English - Great Britain
        case "de": return <DE className="w-8 h-6" />; // German - Germany
        case "fr": return <FR className="w-8 h-6" />; // French - France
        case "ro": return <RO className="w-8 h-6" />; // Romanian - Romania
        case "ar": return <SA className="w-8 h-6" />; // Arabic
        case "es": return <ES className="w-8 h-6" />; // Arabic
        case "sa": return <SA className="w-8 h-6" />; // Arabic
        case "cn": return <CN className="w-8 h-6" />; // Chinese
        case "jp": return <JP className="w-8 h-6" />; // Japanese
        case "hi": return <IN className="w-8 h-6" />; // Hindi
        case "tr": return <TR className="w-8 h-6" />; // Turkish
        case "it": return <IT className="w-8 h-6" />; // Italian
        case "kr": return <KR className="w-8 h-6" />; // Korean
        case "pt": return <PT className="w-8 h-6" />; // Portuguese
        case "ua": return <UA className="w-8 h-6" />; // Ukrainian
        case "se": return <SE className="w-8 h-6" />; // Swedish
        case "ru": return <RU className="w-8 h-6" />; // Russian
        case "vn": return <VN className="w-8 h-6" />; // Vietnamese
        case "ta": return <TA className="w-8 h-6" />; // Tamil
        case "sk": return <SK className="w-8 h-6" />; // Slovak
        case "pl": return <PL className="w-8 h-6" />; // Polish
        case "no": return <NO className="w-8 h-6" />; // Norwegian
        case "my": return <MY className="w-8 h-6" />; // Malaysian
        case "id": return <ID className="w-8 h-6" />; // Indonesian
        case "hu": return <HU className="w-8 h-6" />; // Hungarian
        case "gr": return <GR className="w-8 h-6" />; // Greek
        case "ph": return <PH className="w-8 h-6" />; // Filipino
        case "pk": return <PK className="w-8 h-6" />; // Pakistani
        case "fi": return <FI className="w-8 h-6" />; // Finnish
        case "nl": return <NL className="w-8 h-6" />; // Dutch
        case "dk": return <DK className="w-8 h-6" />; // Danish
        case "cz": return <CZ className="w-8 h-6" />; // Czech
        case "hr": return <HR className="w-8 h-6" />; // Croatian
        case "bg": return <BG className="w-8 h-6" />; // Bulgarian
        case "transylvanian": return <RO className="w-8 h-6" />; // Transylvanian - Romania
        case "parisian": return <FR className="w-8 h-6" />; // Parisian - France
        case "quebec": return <FR className="w-8 h-6" />; // Quebec - Canada (using French flag)
        default: return null;
    }
};;

const VoiceModal = ({ voices, onClose,  filters, onFiltersChange, refer,  }) => {
    const [playingVoiceId, setPlayingVoiceId] = useState(null);
    const audioRef = useRef(new Audio());
    const handlePlayPause = (voice) => {
        if (playingVoiceId === voice.id) {
            audioRef.current.pause();
            setPlayingVoiceId(null);
        } else {
            if (audioRef.current) audioRef.current.pause();
            audioRef.current = new Audio(voice.previewUrl);
            audioRef.current.oncanplaythrough = () => {
                audioRef.current.play().catch((error) => console.error("Error playing audio:", error));
            };
            audioRef.current.load();
            setPlayingVoiceId(voice.id);
        }
    };
    return (
        <div className=" inset-0  flex items-center w-full justify-center  ">
            <div className="bg-white border border-gray-200 rounded-lg  w-3/4 max-w-7xl">
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <div>
                    
                        <h2 className="text-lg text-left font-semibold">32 Voices available and adding new daily</h2>
                        <p className="">
                        Can’t find a voice you like? Email us at  <a href="mailto:support@callsupport.ai" className=" text-blue-500">
                                support@vohoai.com
                            </a> and we will add it.
                        </p>
                    </div>

                    {/* <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl">&times;</button> */}
                </div>
                <div className="p-5">
                    {/* Filters */}
                    <div className="flex space-x-4 mb-">
                        <input
                            type="text"
                            name="search"
                            placeholder="Search voices..."
                            value={filters.search || ""}
                            onChange={onFiltersChange}
                            ref={refer}
                            className="border border-gray-100 rounded-md p-2 mb-4 w-full"
                        />
                        <select
                            name="gender"
                            className="border border-gray-100 rounded-md p-2 mb-4 w-full"
                            value={filters.gender || ""}
                            onChange={onFiltersChange}
                        >
                            <option value="">All Genders</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <select
                            name="accent"
                            className="border border-gray-100 rounded-md p-2 mb-4 w-full"
                            value={filters.accent || ""}
                            onChange={onFiltersChange}
                        >
                            <option value="">All Accents</option>
                            <option value="American">American</option>
                            <option value="German">German</option>
                            <option value="Romanian">Romanian</option>
                            <option value="French">French</option>
                            <option value="Spanish">Spanish</option>
                            <option value="Arabic">Arabic</option>
                            <option value="Chinese">Chinese</option>
                            <option value="Japanese">Japanese</option>
                            <option value="Hindi">Hindi</option>
                            <option value="Turkish">Turkish</option>
                            <option value="Italian">Italian</option>
                            <option value="Korean">Korean</option>
                            <option value="Portuguese">Portuguese</option>
                            <option value="Ukrainian">Ukrainian</option>
                            <option value="Swedish">Swedish</option>
                            <option value="Russian">Russian</option>
                            <option value="Vietnamese">Vietnamese</option>
                            <option value="Tamil">Tamil</option>
                            <option value="Slovak">Slovak</option>
                            <option value="Polish">Polish</option>
                            <option value="Norwegian">Norwegian</option>
                            <option value="Malay">Malay</option>
                            <option value="Indonesian">Indonesian</option>
                            <option value="Hungarian">Hungarian</option>
                            <option value="Greek">Greek</option>
                            <option value="Finnish">Finnish</option>
                            <option value="Filipino">Filipino</option>
                            <option value="Dutch">Dutch</option>
                            <option value="Danish">Danish</option>
                            <option value="Czech">Czech</option>
                            <option value="Croatian">Croatian</option>
                            <option value="Bulgarian">Bulgarian</option>
                            <option value="Pakistani">Pakistani</option>
                        </select>
                        {/* <select
                            name="provider"
                            className="border border-gray-100 rounded-md p-2 mb-4 w-full"
                            value={filters.provider || ""}
                            onChange={onFiltersChange}
                        >
                            <option value="">All Providers</option>
                            <option value="11labs">11labs</option>
                            <option value="openai">Openai</option>
                        </select> */}
                    </div>
                    {/* Voice Table */}
                    <div className="overflow-y-auto max-h-96">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="p-2">Voice</th>
                                    <th className="p-2">Traits</th>
                                    {/* <th className="p-2">Provider</th> */}
                                    <th className="p-2" style={{ visibility: 'hidden' }}>something</th>
                                </tr>
                            </thead>
                            <tbody>
                                {voices.map((voice) => {
                                    if (!voice) return null;
                                    const flagIcon = getFlagIcon(voice.flag)
                                    return (
                                        <tr key={voice.id} className="border-b border-gray-100 hover:bg-gray-100 cursor-pointer group">
                                            <td className="p-2 flex items-center">
                                                <button onClick={() => handlePlayPause(voice)} className="mr-3">
                                                    {playingVoiceId === voice.id ? <Pause /> : <Play />}
                                                </button>
                                                {voice.avatar ? (
                                                    <img
                                                    src={voice.avatar?.src}
                                                    alt={voice.avatar?.alt || "Avatar"}
                                                        className="w-10 h-10 rounded-full mr-3"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                        <span className="text-gray-500">{voice.gender?.charAt(0) || '?'}</span>
                                                    </div>
                                                )}
                                                <span>{voice.name || "Unknown"}</span>
                                            </td>
                                            <td className="p-2  items-center">
                                                <div class="flex">
                                                
                                                    {flagIcon}
                                                    <span className="ml-2">{voice.country}</span>                                           
                                                    {voice.gender && <span className="ml-4">{voice.gender}</span>}
                                                </div>

                                            </td>
                                            {/* <td className="p-2">{voice.provider || "Unknown"}</td> */}
                                            {/* <td className="p-2">
                                                <button
                                                    className="text-blue-500 hover:text-blue-700  "
                                                    onClick={() => {
                                                        onSelectVoice(voice);
                                                        onClose();
                                                    }}
                                                >
                                                    <span className="hidden group-hover:block">Use Voice</span>
                                                </button>
                                            </td> */}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default VoiceModal;