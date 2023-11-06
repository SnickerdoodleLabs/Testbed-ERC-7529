import { useState, useEffect, KeyboardEvent, ChangeEvent } from 'react';
//import { ethers, Provider } from 'ethers';
import { staticUtils } from '@snickerdoodlelabs/erc7529';
import { ChainId, DomainName } from '@snickerdoodlelabs/objects';
import "reflect-metadata";
import './App.css';

export default function DomainInput() {

    // Set some useful chain ids to use later

    const label: string = "Enter a Domain Name:"
    const [value, setValue] = useState<string>("");
    const [fieldName, setFieldName] = useState<string>('field');
    const [domain, setDomain] = useState<DomainName>(DomainName(''));
    const [chain, setChain] = useState<ChainId>(ChainId(43113));

    /*
    let provider: Provider; 
    if (window.ethereum == null) {
        console.log("No ethereum provider found.");
        provider = ethers.getDefaultProvider("mainnet");
    } else {
        provider = new ethers.BrowserProvider(window.ethereum);
        console.log("Found window ethereum provider!")
    }*/

    useEffect(() => {
        (async () => {
          const results = await staticUtils.getContractsFromDomain(domain,chain);
          if (results.isOk()) {
            console.log("Contracts:", results.value);
            setValue(results.value[0]);
          }
        })();
      }, [domain, chain]);

    function changeValue(event: ChangeEvent) {
        const target = event.target;
        if (target) setValue((target as HTMLButtonElement).value);
    }

    function handleKeyPress(event: KeyboardEvent) {
        if (event.code === 'Enter') {
            const target: EventTarget = event.target;
            console.log(event)
            if (target) {
                const domainName: DomainName = DomainName((target as HTMLButtonElement).value);
                setDomain(domainName);
            }
        }
    }

    return (
        <div className={fieldName}>
            <input
                id='1'
                type='text'
                name='domainInput'
                value={value}
                placeholder={label}
                onFocus={() => setFieldName('field active')}
                onBlur={() => setFieldName('field')}
                onChange={changeValue}
                onKeyDown={handleKeyPress}
            />
            <label htmlFor='1'>
                {label}
            </label>
        </div>
    );
}