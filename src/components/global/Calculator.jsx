import React, { useState } from "react";

const SavingsCalculator = () => {
  const [calls, setCalls] = useState(1000);
  const [aiPercentage, setAiPercentage] = useState(50);
  const [minutes, setMinutes] = useState(5);
  const [savings, setSavings] = useState(
    Math.round((1000 * (50 / 100) * 5 * 0.5))
  );

  const updateSavings = (event) => {
    const { id, value } = event.target;

    let updatedCalls = calls;
    let updatedAiPercentage = aiPercentage;
    let updatedMinutes = minutes;

    if (id === "input-calls") {
      updatedCalls = parseInt(value, 10);
      setCalls(updatedCalls);
    }
    if (id === "ai-percent") {
      updatedAiPercentage = parseInt(value, 10);
      setAiPercentage(updatedAiPercentage);
    }
    if (id === "input-time") {
      updatedMinutes = parseInt(value, 10);
      setMinutes(updatedMinutes);
    }

    const updatedSavings = Math.round(
      updatedCalls *
      (updatedAiPercentage / 100) *
      updatedMinutes *
      0.5
    );
    setSavings(updatedSavings);
  };

  return (
    <section className="flex flex-col sm:flex-row max-w-6xl mx-auto mt-8 gap-28 justify-center items-start space-x-8 sm:space-y-8 sm:space-x-0">
      {/* Left Section */}
      <div className="flex flex-col justify-between items-start p-8 border border-gray-300 rounded-lg bg-gray-50 w-96 shadow">
        <div className="bg-blue-100 text-blue-600 text-xs font-semibold uppercase tracking-wide py-1 px-3 rounded-full inline-block mb-4">
          Benefit
        </div>

        <div className="flex flex-col space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 text-blue-600">
             <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 34 34" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M25.0352 3.53906C21.0484 3.53906 17.8164 6.77102 17.8164 10.7578C17.8164 14.7446 21.0484 17.9766 25.0352 17.9766C29.022 17.9766 32.2539 14.7446 32.2539 10.7578C32.2539 6.77102 29.022 3.53906 25.0352 3.53906ZM16.3164 10.7578C16.3164 5.94259 20.2199 2.03906 25.0352 2.03906C29.8504 2.03906 33.7539 5.94259 33.7539 10.7578C33.7539 15.573 29.8504 19.4766 25.0352 19.4766C20.2199 19.4766 16.3164 15.573 16.3164 10.7578ZM25.0352 5.89063C25.4494 5.89063 25.7852 6.22641 25.7852 6.64063V7.08077C26.2209 7.16316 26.6447 7.33152 27.0122 7.60717C27.3436 7.85571 27.4107 8.32581 27.1622 8.65718C26.9136 8.98854 26.4435 9.05569 26.1122 8.80716C25.8544 8.61379 25.4775 8.51274 25.0767 8.5184C25.063 8.51915 25.0491 8.51953 25.0352 8.51953L25.0306 8.51952C24.8485 8.52578 24.6623 8.55401 24.4807 8.60553C23.841 8.78705 23.674 9.1068 23.674 9.26369C23.674 9.41345 23.7077 9.48546 23.733 9.52416C23.7619 9.56825 23.8176 9.62554 23.9368 9.68913C24.209 9.83443 24.6087 9.91597 25.1716 10.0204C25.1901 10.0238 25.2087 10.0273 25.2275 10.0308C25.7129 10.1205 26.3393 10.2364 26.8392 10.5032C27.1158 10.6509 27.3899 10.8615 27.5919 11.1703C27.7975 11.4845 27.8957 11.8505 27.8957 12.252C27.8957 13.4279 26.8678 14.1043 26.0011 14.3517C25.9306 14.3718 25.8585 14.3901 25.7852 14.4063V14.875C25.7852 15.2892 25.4494 15.625 25.0352 15.625C24.6209 15.625 24.2852 15.2892 24.2852 14.875V14.4353C23.8495 14.353 23.4256 14.1846 23.0575 13.9085C22.7261 13.66 22.659 13.1898 22.9075 12.8585C23.156 12.5271 23.6261 12.46 23.9575 12.7085C24.216 12.9024 24.5924 13.0032 24.9923 12.9973C25.0065 12.9965 25.0208 12.9961 25.0352 12.9961L25.0396 12.9961C25.2217 12.9896 25.4079 12.9611 25.5894 12.9093C26.2293 12.7267 26.3957 12.4062 26.3957 12.252C26.3957 12.1022 26.362 12.0302 26.3367 11.9915C26.3078 11.9474 26.2521 11.8901 26.1329 11.8265C25.8607 11.6812 25.461 11.5997 24.898 11.4952C24.8796 11.4918 24.861 11.4884 24.8422 11.4849C24.3568 11.3951 23.7304 11.2793 23.2305 11.0124C22.9539 10.8648 22.6798 10.6542 22.4778 10.3453C22.2722 10.0311 22.174 9.6652 22.174 9.26369C22.174 8.08442 23.2033 7.40877 24.0713 7.1625C24.1411 7.14268 24.2125 7.12472 24.2852 7.10873V6.64063C24.2852 6.22641 24.6209 5.89063 25.0352 5.89063ZM12.9554 18.3639L12.9564 18.3643L21.6122 21.2281C23.0867 21.7196 23.8581 23.3371 23.3125 24.7922C23.2623 24.9261 23.2027 25.0539 23.1347 25.1749C23.8253 25.0278 24.4881 24.7405 25.0788 24.3195L29.4178 21.1142C30.6029 20.2678 32.2431 20.4955 33.1529 21.6327C34.1342 22.8593 33.8863 24.6574 32.6111 25.5729L28.6266 28.5248C25.5867 30.696 21.951 31.9171 18.2072 31.9609C16.7545 31.9779 15.2459 31.7916 13.8454 31.4711M13.8442 31.4708L5.73047 29.6271V30.6797C5.73047 31.0939 5.39468 31.4297 4.98047 31.4297H0.996094C0.58188 31.4297 0.246094 31.0939 0.246094 30.6797V20.7188C0.246094 20.3045 0.581875 19.9688 0.996085 19.9688L4.67946 19.9687C7.31911 17.5472 11.0155 17.7175 12.9554 18.3639M4.23047 21.4687L1.74609 21.4687V29.9297H4.23047V28.7038C4.23025 28.6934 4.23025 28.683 4.23047 28.6726V21.4687ZM5.73047 28.0888L14.1789 30.0086C15.4806 30.3066 16.8706 30.4764 18.1897 30.461C21.6163 30.4209 24.9532 29.3034 27.7494 27.3079L31.7336 24.3563C32.3134 23.9422 32.4268 23.1262 31.9816 22.5698C31.5706 22.0561 30.8306 21.9521 30.2941 22.3318L25.9554 25.5368C24.2046 26.7874 21.961 27.1249 19.9196 26.4448L19.9185 26.4444L13.7771 24.4194C13.3837 24.2897 13.1699 23.8656 13.2996 23.4723C13.4293 23.0789 13.8534 22.8651 14.2468 22.9948L20.334 25.002C20.3401 25.0038 20.3461 25.0058 20.3522 25.0078C20.986 25.2191 21.6734 24.8911 21.908 24.2655C22.1551 23.6065 21.8059 22.8742 21.1386 22.6513L12.482 19.7872C10.8491 19.2428 7.82778 19.1539 5.73047 21.0407V28.0888Z" fill="currentColor"></path></svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              The cost savings per month
            </h3>
          </div>

          <div className="bg-blue-50 text-blue-600 text-4xl font-bold py-6 rounded-lg text-center w-full">
            <span id="calculate-result">{savings}</span> Euro
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          *This calculation is a non-binding forecast based on surveys and
          experience of Leaping AI users
        </p>
      </div>

      {/* Right Section */}
      <div className="flex flex-col space-y-10 w-[36.5em]">
        <div className="text-dark text-2xl font-bold">
          <h2>
            <div className="inline-block">Calculate the potential*</div>
            <div className="inline-block"></div>
            <div className="inline-block"></div>
          </h2>
        </div>

        <div className="space-y-8">
          <form id="wf-form-calculate" name="wf-form-calculate" method="get" aria-label="calculate" className="space-y-6">
            {/* Number of Calls Input */}
            <div>
              <label htmlFor="input-calls" className="block text-gray-800 font-medium mb-2">
                Number of calls you get per month
              </label>
              <div className="flex items-center space-x-4">
                <input
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 ${(calls / 20000) * 100
                      }%, #e5e7eb ${(calls / 20000) * 100}%)`,
                  }}
                  type="range"
                  id="input-calls"
                  min="0"
                  max="20000"
                  value={calls}
                  onChange={updateSavings}
                />
                <span className="text-gray-800 font-medium">{calls}</span>
              </div>
            </div>

            {/* AI Percentage Input */}
            <div>
              <label htmlFor="ai-percent" className="block text-gray-800 font-medium mb-2">
                % you want AI to do
              </label>
              <div className="flex items-center space-x-4">
                <input
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 ${aiPercentage}%, #e5e7eb ${aiPercentage}%)`,
                  }}
                  type="range"
                  id="ai-percent"
                  min="0"
                  max="100"
                  step="1"
                  value={aiPercentage}
                  onChange={updateSavings}
                />
                <span className="text-gray-800 font-medium">{aiPercentage}%</span>
              </div>
            </div>
            <div>
              <label
                htmlFor="input-time"
                className="block text-gray-800 font-medium mb-2"
              >
                Average number of conversation minutes per call
              </label>
              <div className="flex items-center space-x-4">
                <input
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 ${((minutes - 1) / 9) * 100
                      }%, #e5e7eb ${((minutes - 1) / 9) * 100}%)`,
                  }}
                  type="range"
                  id="input-time"
                  min="1"
                  max="10"
                  value={minutes}
                  onChange={updateSavings}
                />
                <span className="text-gray-800 font-medium">
                  {minutes} <span className="text-sm text-gray-500">min</span>
                </span>
              </div>
            </div>

          </form>
        </div>

        <div className="text-center">
          <a
            href="#contact-us"
            className="w-full inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
          >
            Schedule a demo
          </a>
        </div>
      </div>
    </section>
  );
};

export default SavingsCalculator;
