import { useState, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import { ethers } from 'ethers';
import { staticUtils } from '@snickerdoodlelabs/erc7529';
import { ERC7529ContractProxy } from '@snickerdoodlelabs/contracts-sdk';
import { ChainId, DomainName, EVMContractAddress } from '@snickerdoodlelabs/objects';
import "reflect-metadata";
import './App.css';

export default function DomainInput() {

    interface verifedContract {
        address: EVMContractAddress;
        verified: Boolean
    };

    const [label, setLabel] = useState<string>("Enter a Domain Name:");
    const [placeholder, setPlaceholder] = useState<string>("Enter a Domain Name:")
    const [value, setValue] = useState<string>("");
    const [fieldName, setFieldName] = useState<string>('field');
    const [domain, setDomain] = useState<DomainName>(DomainName(''));
    const [chain, setChain] = useState<ChainId>(ChainId(43113));
    const [results, setResult] = useState<verifedContract[]>([]);

    function changeValue(event: ChangeEvent) {
        const target = event.target;
        if (target) setValue((target as HTMLButtonElement).value);
    }

    async function handleKeyPress(event: KeyboardEvent) {
        if (event.code === 'Enter') {
            const target: EventTarget = event.target;
            console.log(event)
            if (target) {
                const domainName: DomainName = DomainName((target as HTMLButtonElement).value);
                setDomain(domainName);
                try {
                    // first check if domain has TXT pointer to some contracts
                    const addresses = await staticUtils.getContractsFromDomain(domainName, chain);
                    // if so, verify each contract
                    if (addresses.isOk()) {
                        if (addresses.value.length > 0) {
                            let resultsBuf: verifedContract[] = [];
                            const provider = new ethers.providers.Web3Provider(window.ethereum);
                            addresses.value.map(
                                async (address) => {
                                    const myContract = new ERC7529ContractProxy(provider, EVMContractAddress(address));
                                    if (window.ethereum != null) {
                                        const isVerified = await staticUtils.verifyContractForDomain(myContract, domain, chain);
                                        console.log(isVerified)
                                        if (isVerified.isOk()) {
                                            resultsBuf.push({ address: address, verified: true })
                                        } else {
                                            resultsBuf.push({ address: address, verified: false })
                                        }
                                    }
                                }
                            )
                            setResult(resultsBuf);
                            console.log("resultBuf:", resultsBuf);
                            setLabel("Found Something! Try another domain:");
                        } else {
                            setLabel("Try a different domain:");
                            setResult([]);
                        }
                    }
                } catch {
                    setLabel("Try a different domain:");
                } finally {
                    setValue("");
                }
            }
        }
    }

    return (
        <>
            <div className={fieldName}>
                <input
                    id='1'
                    type='text'
                    name='domainInput'
                    value={value}
                    placeholder={placeholder}
                    onFocus={() => { setFieldName('field active'); setPlaceholder(''); }}
                    onBlur={() => { setFieldName('field'); setPlaceholder(value); }}
                    onChange={changeValue}
                    onKeyDown={handleKeyPress}
                />
                <label htmlFor='1'>
                    {label}
                </label>
            </div><br></br>
            <ul className='results'>
                {
                    results.map((result) => <div key={result.address}>{result.address}: {result.verified ? "Verified" : "Not verified"} on chain {chain}.</div>)
                }
            </ul>
        </>
    );
}