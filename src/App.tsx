import { Fragment, useEffect, useState } from "react";
import {
  decimalConverter,
  Convertion,
  convert,
} from "./functions/decimalToBinary";

function App() {
  const availableConverts: {
    icon: string;
    name: Convertion;
  }[] = [
    {
      icon: "123",
      name: Convertion.DECIMAL,
    },
    {
      icon: "01",
      name: Convertion.BINARY,
    },
    {
      icon: "000",
      name: Convertion.OCTAL,
    },
    {
      icon: "000X",
      name: Convertion.HEX,
    },
  ];

  const [selectedConvertTo, setSelectedConvertTo] = useState<Convertion>(
    Convertion.BINARY
  );
  const [selectedConvertFrom, setSelectedConvertFrom] = useState<Convertion>(
    Convertion.DECIMAL
  );

  const [previousConvertFrom, setPreviousConvertFrom] = useState<Convertion>(
    Convertion.DECIMAL
  );

  const [value, setValue] = useState<string | number>("");
  const [convertedValue, setConvertedValue] = useState<any>(null);

  const handleConvert = ({
    convertFrom,
    convertTo,
  }: {
    convertFrom: Convertion;
    convertTo: Convertion;
  }) => {
    if (value) {
      setConvertedValue(convert(value, convertFrom, convertTo));
    }
  };

  useEffect(() => {
    if (value) {
      handleConvert({
        convertFrom: selectedConvertFrom,
        convertTo: selectedConvertTo,
      });
    }
  }, [selectedConvertTo]);

  useEffect(() => {
    if (value) {
      setValue((pv) => convert(pv, previousConvertFrom, selectedConvertFrom));
      setPreviousConvertFrom(selectedConvertFrom);
      setConvertedValue(null);
    }
    if (selectedConvertFrom !== Convertion.DECIMAL) {
      setSelectedConvertTo(Convertion.DECIMAL);
    } else {
      setSelectedConvertTo(Convertion.BINARY);
    }
  }, [selectedConvertFrom]);

  const clear = () => {
    setValue("");
    setConvertedValue(null);
  };
  return (
    <main className="p-3 w-full h-screen flex items-center justify-center">
      <div className="w-full max-w-xl p-5 rounded-md border">
        <div className="w-full flex md:flex-row flex-col items-center justify-between">
          <div className="w-full md:flex-row flex-col flex items-center justify-between divide-y-2 md:divide-y-0 md:divide-x-2">
            {/* convert from */}
            <div className="w-full md:pr-5 ">
              <div className="md:mb-4 text-[0.6rem] uppercase tracking-wider text-gray-600">
                convert from
              </div>
              <div className="mt-2 md:mt-0 w-full flex items-center justify-between">
                {availableConverts.map(({ icon, name }, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedConvertFrom(name)}
                  >
                    <div
                      className={`text-xs font-bold rounded-full ${
                        selectedConvertFrom === name
                          ? "text-blue-600"
                          : "text-gray-600 "
                      }`}
                    >
                      {icon}
                    </div>
                    <span
                      className={`text-xs uppercase px-2 py-0.5 rounded-xl ${
                        selectedConvertFrom === name
                          ? "bg-blue-600 text-white"
                          : "bg-transparent text-gray-600"
                      }`}
                    >
                      {name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            {/* convert To */}
            <div className="mt-5 pt-5 md:pt-0 md:mt-0 w-full md:pl-5">
              <div className="md:mb-4 text-[0.6rem] uppercase tracking-wider text-gray-600">
                convert To
              </div>
              <div className="mt-2 md:mt-0 w-full flex items-center justify-between">
                {availableConverts.map(({ icon, name }, idx) => (
                  <Fragment key={idx}>
                    {selectedConvertFrom !== name && (
                      <button onClick={() => setSelectedConvertTo(name)}>
                        <div
                          className={`text-xs font-bold rounded-full ${
                            selectedConvertTo === name
                              ? "text-blue-600"
                              : "text-gray-600 "
                          }`}
                        >
                          {icon}
                        </div>
                        <span
                          className={`text-xs uppercase px-2 py-0.5 rounded-xl ${
                            selectedConvertTo === name
                              ? "bg-blue-600 text-white"
                              : "bg-transparent text-gray-600"
                          }`}
                        >
                          {name}
                        </span>
                      </button>
                    )}
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleConvert({
              convertFrom: selectedConvertFrom,
              convertTo: selectedConvertTo,
            });
          }}
          className="mt-10 w-full md:flex-row flex-col flex items-center justify-between"
        >
          <input
            type="text"
            className="w-full px-3 py-2 rounded-md border focus:outline-none text-sm text-gray-800"
            placeholder="Enter decimal value"
            value={value}
            onChange={(e) => setValue(e.target.value.trim())}
          />

          <button
            type="submit"
            className="mt-10 md:mt-0 w-full md:w-auto ml-3 mr-3 px-3 py-2 text-sm uppercase flex items-center justify-center center bg-green-600 text-white hover:bg-green-700 rounded-md focus:outline-none"
          >
            convert
          </button>

          <button
            type="reset"
            onClick={clear}
            className="mt-2 md:mt-0 w-full md:w-auto px-3 py-2 text-sm uppercase flex items-center justify-center center bg-gray-400 text-white hover:bg-gray-500 rounded-md focus:outline-none"
          >
            clear
          </button>
        </form>

        {/* answer */}
        {convertedValue !== null && (
          <div className="mt-5 w-full flex flex-col items-center justify-center md:block">
            <span className="text-[0.65rem] uppercase text-gray-600 tracking-wider">
              {selectedConvertTo} value
            </span>
            <h3 className="text-xl text-gray-800 font-bold">
              {convertedValue}
            </h3>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
